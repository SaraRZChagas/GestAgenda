<?php

namespace App\Http\Controllers\Professional;

use App\Models\WorkingHour;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WorkingHourController extends Controller
{

    public function index()
    {
        $user = auth()->user();
        $professionalId = $user->professional->idProfessionals;

        $workingHours = WorkingHour::where('idProfessionals', $professionalId)->get();

        return inertia('professional/working-hours', [
            'workingHours' => $workingHours
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        $professionalId = $user->professional->idProfessionals;

        $validated = $request->validate([
            'selectedDays' => 'required|array|min:1',
            'selectedDays.*' => 'integer|min:0|max:6',
            'startTimeWorkingHours' => 'required|date_format:H:i',
            'endTimeWorkingHours' => 'required|date_format:H:i|after:startTimeWorkingHours',
        ]);

        $diasExistentes = WorkingHour::where('idProfessionals', $professionalId)
            ->whereIn('weekdayWorkingHours', $validated['selectedDays'])
            ->pluck('weekdayWorkingHours')
            ->toArray();

        if (!empty($diasExistentes)) {
            return back()->withErrors([
                'selectedDays' => 'Os seguintes dias já possuem horário: ' .
                    implode(', ', $diasExistentes)
            ]);
        }

        foreach ($validated['selectedDays'] as $day) {
            WorkingHour::create([
                'idProfessionals' => $professionalId,
                'weekdayWorkingHours' => $day,
                'startTimeWorkingHours' => $validated['startTimeWorkingHours'],
                'endTimeWorkingHours' => $validated['endTimeWorkingHours'],
            ]);
        }

        return redirect()->back()->with('success', 'Horários adicionados com sucesso!');
    }

    public function update(Request $request, $id)
    {
        $workingHour = WorkingHour::findOrFail($id);
        
        // Garantir que o horário pertence ao profissional logado
        if ($workingHour->idProfessionals !== auth()->user()->professional->idProfessionals) {
            abort(403, 'Acesso não autorizado.');
        }

        $validated = $request->validate([
            'selectedDays' => 'required|array|min:1',
            'selectedDays.*' => 'integer|min:0|max:6',
            'startTimeWorkingHours' => [
                'required',
                'regex:/^\d{2}:\d{2}(:\d{2})?$/'
            ],
            'endTimeWorkingHours' => [
                'required',
                'regex:/^\d{2}:\d{2}(:\d{2})?$/',
                'after:startTimeWorkingHours'
            ]
        ]);

        $workingHour->update($validated);

        return redirect()->back()->with('success', 'Horário atualizado!');
    }

    public function destroy($id)
    {
        $workingHour = WorkingHour::findOrFail($id);

        // Garantir que o horário pertence ao profissional logado
        if ($workingHour->idProfessionals !== auth()->user()->professional->idProfessionals) {
            abort(403, 'Acesso não autorizado.');
        }

        $workingHour->delete();

        return redirect()->back()->with('success', 'Horário removido!');
    }
}
