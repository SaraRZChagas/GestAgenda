<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Professional extends Model
{
    protected $table = 'Professionals';
    protected $primaryKey = 'idProfessionals';
    public $timestamps = true;

    protected $fillable = [

           'nameProfessionals',
           'bioProfessionals',
           'addressProfessionals',
           'phoneProfessionals',
            'nameBusinessProfessionals',
            'created_at',
            'updated_at',
            'profile_photo',
           'idUsers', 
    ];

    public function services()
    {
        return $this->hasMany(Service::class, 'idProfessionals', 'idProfessionals');
    }

    public function scheduleBlocks() 
    {   
        return $this->hasMany(ScheduleBlock::class, 'idProfessionals', 'idProfessionals'); 
    }

    public function workingHours()
    {
        return $this->hasMany(WorkingHour::class, 'idProfessionals', 'idProfessionals');
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class, 'idProfessionals', 'idProfessionals');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'idUsers', 'id'); 
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'idProfessionals', 'idProfessionals');
    }
}