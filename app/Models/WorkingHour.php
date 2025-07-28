<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkingHour extends Model
{
    use HasFactory;

    protected $table = 'WorkingHours'; 
    protected $primaryKey = 'idWorkingHours';
    public $timestamps = true;

    protected $fillable = [
        'idProfessionals',
        'weekdayWorkingHours',
        'startTimeWorkingHours',
        'endTimeWorkingHours',
    ];

    public function professional()
    {
        return $this->belongsTo(Professional::class, 'idProfessionals', 'idProfessionals');
    }
}
