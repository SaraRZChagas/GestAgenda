<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Professional extends Model
{
    protected $fillable = ['phoneProfessionals', 'profile_photo', 'idusers'];

    protected $primaryKey = 'idProfessionals';
    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class, 'idusers');
    }
    public function services()
    {
        return $this->hasMany(Service::class, 'idProfessionals', 'idProfessionals');
    }
    public function workingHour()
    {
        return $this->hasMany(WorkingHour::class, 'idProfessionals', 'idProfessionals');
    }
}
