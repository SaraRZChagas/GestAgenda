<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleBlockType extends Model
{
    protected $table = 'ScheduleBlocksTypes';
    protected $primaryKey = 'idScheduleBlocksTypes';
    public $timestamps = false;

    protected $fillable = [
        'nameScheduleBlocksTypes',
        'colorScheduleBlocksTypes',
    ];

    public function scheduleBlocks()
    {
        return $this->hasMany(ScheduleBlock::class, 'idScheduleBlocksTypes', 'idScheduleBlocksTypes');
    }
}
