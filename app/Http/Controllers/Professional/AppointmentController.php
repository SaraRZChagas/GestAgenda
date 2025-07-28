<?php

namespace App\Http\Controllers\Professional;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\WorkingHour;
use App\Models\ScheduleBlock;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    // Retorna lista de marcações do profissional
    public function index()
    {
        $professional = auth()->user()->professional;
        $now = Carbon::now();

        $appointments = Appointment::where('idProfessionals', $professional->idProfessionals)
            ->where('endDatetimeAppointments', '>=', $now)       // filtro para futuras ou que ainda não terminaram
            ->with(['customer', 'service'])
            ->orderBy('startDatetimeAppointments')
            ->get();

        return Inertia::render('professional/appointments/Index', [
            'appointments' => $appointments,
        ]);
    }

    // Página de criação de marcação
    public function create()
    {
        $professional = auth()->user()->professional;

        // Trazer serviços do profissional para select
        $services = $professional->services()->where('isActiveServices', true)->get();

        // Trazer clientes vinculados ao profissional (opcional: todos os clientes)
        $customers = Customer::all() ?? []; // ajuste conforme relacionamento

        return Inertia::render('professional/appointments/Create', [
            'services' => $services,
            'customers' => $customers,
        ]);
    }

    // Validação customizada (opcional via API)
    public function validateSchedule(Request $request)
    {
        $validated = $request->validate([
            'startDatetimeAppointments' => 'required|date',
            'endDatetimeAppointments' => 'required|date|after:start',
            'idServices' => 'required|exists:services,idServices',
            // cliente pode ser opcional
        ]);

        $professional = auth()->user()->professional;

        $start = Carbon::parse($validated['start']);
        $end = Carbon::parse($validated['end']);

        // Verifica WorkingHours
        if (!$this->isWithinWorkingHours($professional->idProfessionals, $start, $end)) {
            return response()->json(['message' => 'Horário fora do expediente de trabalho'], 422);
        }

        // Verifica bloqueios
        if ($this->hasScheduleBlock($professional->idProfessionals, $start, $end)) {
            return response()->json(['message' => 'Horário bloqueado na agenda'], 422);
        }

        // Verifica conflito de marcações
        if ($this->hasAppointmentConflict($professional->idProfessionals, $start, $end)) {
            return response()->json(['message' => 'Já existe uma marcação nesse horário'], 422);
        }

        return response()->json(['message' => 'Horário disponível']);
    }

    // Armazena uma nova marcação
    public function store(Request $request)
    {
        $data = $request->validate([
            'idCustomers' => 'required|exists:customers,idCustomers',
            'idServices' => 'required|exists:services,idServices',
            'startDatetimeAppointments' => 'required|date',
            'endDatetimeAppointments' => 'required|date|after:startDatetimeAppointments',
            'notesAppointments' => 'nullable|string|max:500',
        ]);

        $professional = auth()->user()->professional;

        $start = Carbon::parse($data['startDatetimeAppointments']);
        $end = Carbon::parse($data['endDatetimeAppointments']);

        // Valida horários conforme regra (pode extrair para métodos privados)
        $validator = Validator::make($data, []);

        if (!$this->isWithinWorkingHours($professional->idProfessionals, $start, $end)) {
            $validator->errors()->add('startDatetimeAppointments', 'Horário fora do expediente de trabalho');
        }

        if ($this->hasScheduleBlock($professional->idProfessionals, $start, $end)) {
            $validator->errors()->add('startDatetimeAppointments', 'Horário bloqueado na agenda');
        }

        if ($this->hasAppointmentConflict($professional->idProfessionals, $start, $end)) {
            $validator->errors()->add('startDatetimeAppointments', 'Já existe uma marcação nesse horário');
        }

        if ($validator->errors()->any()) {
            throw new ValidationException($validator);
        }

        // Cria a marcação
        Appointment::create([
            'idProfessionals' => $professional->idProfessionals,
            'idCustomers' => $data['idCustomers'],
            'idServices' => $data['idServices'],
            'startDatetimeAppointments' => $start,
            'endDatetimeAppointments' => $end,
            'statusAppointments' => 'scheduled',
            'notesAppointments' => $data['notesAppointments'] ?? null,
        ]);

        return to_route('professional.appointments.index')
            ->with('success', 'Marcação criada com sucesso!');
    }

    // Valida se o horário está dentro do horário de funcionamento
    private function isWithinWorkingHours(int $professionalId, Carbon $start, Carbon $end): bool
    {
        $workingHours = WorkingHour::where('idProfessionals', $professionalId)->get();

        $dayOfWeek = $start->dayOfWeek; // 0(dom) .. 6(sab)

        foreach ($workingHours as $wh) {
            if ($wh->weekdayWorkingHours == $dayOfWeek) {
                // monta horários no mesmo dia do agendamento, usando a hora do expediente
                $workStart = $start->copy()->setTimeFromTimeString($wh->startTimeWorkingHours);
                $workEnd = $start->copy()->setTimeFromTimeString($wh->endTimeWorkingHours);

                if (
                    $start->greaterThanOrEqualTo($workStart) &&
                    $end->lessThanOrEqualTo($workEnd)
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    // Verifica bloqueios de agenda no intervalo
    private function hasScheduleBlock(int $professionalId, Carbon $start, Carbon $end): bool
    {
        return ScheduleBlock::where('idProfessionals', $professionalId)
            ->where(function ($q) use ($start, $end) {
                $q->whereBetween('startDatetimeScheduleBlocks', [$start, $end])
                    ->orWhereBetween('endDatetimeScheduleBlocks', [$start, $end])
                    ->orWhere(function ($qq) use ($start, $end) {
                        $qq->where('startDatetimeScheduleBlocks', '<=', $start)
                           ->where('endDatetimeScheduleBlocks', '>=', $end);
                    });
            })
            ->exists();
    }

    // Verifica conflitos com marcações existentes
    private function hasAppointmentConflict(int $professionalId, Carbon $start, Carbon $end): bool
    {
        return Appointment::where('idProfessionals', $professionalId)
            ->whereIn('statusAppointments', ['scheduled']) // considera apenas agendados
            ->where(function ($q) use ($start, $end) {
                $q->whereBetween('startDatetimeAppointments', [$start, $end])
                    ->orWhereBetween('endDatetimeAppointments', [$start, $end])
                    ->orWhere(function ($qq) use ($start, $end) {
                        $qq->where('startDatetimeAppointments', '<=', $start)
                           ->where('endDatetimeAppointments', '>=', $end);
                    });
            })
            ->exists();
    }

    public function edit($id)
    {
        $appointment = Appointment::with(['customer', 'service'])->findOrFail($id);
        $professional = auth()->user()->professional;

        if ($appointment->idProfessionals !== $professional->idProfessionals) {
            abort(403);
        }
        $professionalId = $professional->idProfessionals;
        $services = $professional->services()->where('isActiveServices', true)->get();

        $customers = Customer::whereHas('appointments', function ($query) use ($professionalId) {
            $query->where('idProfessionals', $professionalId);
        })->get();

        return Inertia::render('professional/appointments/Edit', [
            'appointment' => $appointment,
            'services' => $services,
            'customers' => $customers,
        ]);
    }

    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);
        $professional = auth()->user()->professional;

        if ($appointment->idProfessionals !== $professional->idProfessionals) {
            abort(403);
        }

        $data = $request->validate([
            'idCustomers' => 'required|exists:customers,idCustomers',
            'idServices' => 'required|exists:services,idServices',
            'startDatetimeAppointments' => 'required|date',
            'endDatetimeAppointments' => 'required|date|after:startDatetimeAppointments',
            'statusAppointments' => ['required', Rule::in(['scheduled', 'cancelled'])],
            'notesAppointments' => 'nullable|string|max:500',
        ]);

        // Validar horários (pode reutilizar métodos privados)

        // Atualiza o registro
        $appointment->update([
            'idCustomers' => $data['idCustomers'],
            'idServices' => $data['idServices'],
            'startDatetimeAppointments' => $data['startDatetimeAppointments'],
            'endDatetimeAppointments' => $data['endDatetimeAppointments'],
            'statusAppointments' => $data['statusAppointments'],
            'notesAppointments' => $data['notesAppointments'],
        ]);

        return to_route('professional.appointments.index')->with('success', 'Marcação atualizada!');
    }

    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $professional = auth()->user()->professional;

        if ($appointment->idProfessionals !== $professional->idProfessionals) {
            abort(403);
        }

        $appointment->delete();

        return to_route('professional.appointments.index')->with('success', 'Marcação cancelada!');
    }

    public function history(Request $request)
    {
        $professional = auth()->user()->professional;
        $now = Carbon::now();

        $query = Appointment::where('idProfessionals', $professional->idProfessionals)
            ->where('endDatetimeAppointments', '<', $now)    // marcações que já terminaram
            ->with(['customer', 'service'])
            ->orderByDesc('startDatetimeAppointments');

        if ($request->filled('customer_id')) {
            $query->where('idCustomers', $request->customer_id);
        }

        $appointments = $query->paginate(20);

        $professionalId = $professional->idProfessionals;

        $customers = Customer::whereHas('appointments', function ($query) use ($professionalId) {
            $query->where('idProfessionals', $professionalId);
        })->get();

        return Inertia::render('professional/appointments/history', [
            'appointments' => $appointments,
            'customers' => $customers,
            'filters' => $request->only('customer_id'),
        ]);
    }


}
