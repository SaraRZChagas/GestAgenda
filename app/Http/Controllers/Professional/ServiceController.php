<?php

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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\ServicesType; 
use Illuminate\Support\Facades\Log;


class ServiceController extends Controller
{
   public function index(): Response
{
    $user = auth()->user();
    $professional = $user->professional;

    $services = Service::with('serviceType') // eager load se quiser o tipo
        ->where('idProfessionals', $professional->idProfessionals)
        ->get();

     $serviceTypes = ServicesType::all();

    return Inertia::render('professional/services', [
        'services' =>  $services,
        'serviceTypes' => $serviceTypes,
        'breadcrumbs' => [
            ['title' => 'Dashboard', 'href' => route('professional.dashboard')],            
            ['title' => 'Serviços', 'href' => route('professional.services.index')],
        ],
    ]);
}

   public function store(StoreServiceRequest $request)

{
                foreach ($request->allFiles() as $key => $file) {
    \Log::info("Arquivo encontrado no campo: {$key}", [$file]);
}


             //Verifica se o usuário enviou uma foto de perfil
        if ($request->hasFile('profile_photo')) {
               \Log::info('Arquivo recebido', [$request->file('profile_photo')]);
            } else {
                \Log::info('Nenhum arquivo recebido');
            }
    
    $professional = Auth::user()->professional; // Obtém o profissional associado ao usuário autenticado
    $data = $request->validated();
      if (!$professional) {
        return back()->withErrors(['msg' => 'Profissional não encontrado.']);
    }

  
    $profilePhotoPath = null;


    if ($request->hasFile('profile_photo')) {
        $profilePhotoPath = $request->file('profile_photo')->store('service_photos', 'public');
    }

    

       Service::create([
        'idProfessionals' => $professional->idProfessionals,
        'idServicesTypes' => $data['idServicesTypes'],
        'nameServices' => $data['nameServices'],
        'descriptionServices' => $data['descriptionServices'],
        'priceServices' => $data['priceServices'],
        'durationMinutesServices' => $data['durationMinutesServices'],
        'isActiveServices' => $data['isActiveServices'],
        'profile_photo' => $profilePhotoPath,
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ]);

    return to_route('professional.services.index')
        ->with('success', 'Serviço criado com sucesso!');
}

public function update(StoreServiceRequest $request, Service $service)
{
    $data = $request->validated();  

    $service->update($data);

    return back()->with('success', 'Serviço atualizado com sucesso.');
}

    public function destroy(Service $service)
    {
        

        $service->delete();

        return back()->with('success', 'Serviço excluído com sucesso!');
    }
}
