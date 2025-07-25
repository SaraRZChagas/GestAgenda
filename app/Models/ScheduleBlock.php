<?php

namespace App\Models;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ScheduleBlock;
use App\Models\ScheduleBlockType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

class ScheduleBlock extends Model
{
    protected $table = 'ScheduleBlocks';
    protected $primaryKey = 'idScheduleBlocks';
    public $timestamps = true;

    protected $fillable = [
        'idProfessionals',
        'startDatetimeScheduleBlocks',
        'endDatetimeScheduleBlocks',
        'idScheduleBlocksTypes',
        'descriptionScheduleBlocks',
    ];

    public function professional()
    {
        return $this->belongsTo(Professional::class, 'idProfessionals', 'idProfessionals');
    }

    public function blockType()
    {
        return $this->belongsTo(ScheduleBlockType::class, 'idScheduleBlocksTypes', 'idScheduleBlocksTypes');
    }
}
