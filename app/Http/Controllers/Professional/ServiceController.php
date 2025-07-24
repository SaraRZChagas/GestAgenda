<?php

// app/Http/Controllers/Professional/ServiceController.php

namespace App\Http\Controllers\Professional;
 
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class ServiceController extends Controller
{
    public function index(): Response
    {
        $services = Service::where('idProfessionals', auth()->user()->id)->get(); // ajustar se necessário

        return Inertia::render('professional/services', [
            'services' => $services,
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => route('professional.dashboard')],
                ['title' => 'Serviços'],
            ],
        ]);
    }

   public function store(StoreServiceRequest $request)

{

    $professional = Auth::user()->professional; // Obtém o profissional associado ao usuário autenticado
    $request->validate([
        'nameServices' => 'required|string|max:45',
        'descriptionServices' => 'nullable|string|max:500',
        'priceServices' => 'required|numeric|min:0',
        'durationMinutesServices' => 'required|integer|min:1',
        'isActiveServices' => 'required|boolean',
    ]);

       Service::create([
        'idProfessionals' => $professional->idProfessionals,
        'nameServices' => $request->nameServices,
        'descriptionServices' => $request->descriptionServices,
        'priceServices' => $request->priceServices,
        'durationMinutesServices' => $request->durationMinutesServices,
        'idServicesTypes' => $request->idServicesTypes,
        'isActiveServices' => $request->boolean('isActiveServices'),
        'createdServices' => now(),
        'updatedServices' => now(),
    ]);

    return redirect()->route('professional.services.index') 
        ->with('success', 'Serviço criado com sucesso!');
}

    public function update(StoreServiceRequest $request, Service $service)
    {
        $this->authorize('update', $service); // Opcional, se usar políticas

        $data = $request->validated();
        $data['updatedServices'] = Carbon::now();

        $service->update($data);

        return back()->with('success', 'Serviço atualizado com sucesso!');
    }

    public function destroy(Service $service)
    {
        $this->authorize('delete', $service); // Opcional

        $service->delete();

        return back()->with('success', 'Serviço excluído com sucesso!');
    }
}
