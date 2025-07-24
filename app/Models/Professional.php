<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Professional extends Model
{
    protected $table = 'Professionals';
    protected $primaryKey = 'idProfessionals';
    public $timestamps = true;

    protected $fillable = [
      'idProfessionals',
           'nameProfessionals',
           'bioProfessionals',
           'addressProfessionals,
           phoneProfessionals',
            'nameBusinessProfessionals',
            'createdProfessionals',
            'updatedProfessionals',
            'profile_photo',
           'idUsers', 
    ];

    public function services()
{
    return $this->hasMany(Service::class, 'idProfessionals');
}
    public function workingHour()
    {
        return $this->hasMany(WorkingHour::class, 'idProfessionals');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'idUsers', 'id'); // Assuming 'idUsers' is the foreign key in Professionals table
    }

}