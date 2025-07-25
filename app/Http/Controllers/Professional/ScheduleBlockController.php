<?php

namespace App\Http\Controllers\Professional;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ScheduleBlock;
use App\Models\ScheduleBlockType;
use Illuminate\Support\Facades\Auth;

class ScheduleBlockController extends Controller
{
    public function index()
    {
        $professionalId = Auth::user()->professional->idProfessionals;

        return Inertia::render('professional/schedule-blocks', [
            'blocks' => ScheduleBlock::where('idProfessionals', $professionalId)
                        ->with('blockType')
                        ->get(),
            'types' => ScheduleBlockType::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'startDatetimeScheduleBlocks' => 'required|date',
            'endDatetimeScheduleBlocks'   => 'required|date|after:startDatetimeScheduleBlocks',
            'idScheduleBlocksTypes'       => 'required|exists:ScheduleBlocksTypes,idScheduleBlocksTypes',
            'descriptionScheduleBlocks'   => 'nullable|string|max:100',
        ]);

        $validated['idProfessionals'] = Auth::user()->professional->idProfessionals;

        ScheduleBlock::create($validated);

        return back()->with('success', 'Bloqueio cadastrado com sucesso!');
    }

    public function storeType(Request $request)
    {
        $validated = $request->validate([
        'nameScheduleBlocksTypes' => 'required|string|max:45',
        'colorScheduleBlocksTypes' => 'nullable|string|max:10',
        ]);

        $type = ScheduleBlockType::create($validated);

        return response()->json([
            'success' => true,
            'type' => $type
        ]);
    }
}
