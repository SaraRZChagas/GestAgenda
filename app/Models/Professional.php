<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Professional extends Model
{
    protected $table = 'Professionals';
    protected $primaryKey = 'idProfessionals';
    public $timestamps = false;

    protected $fillable = [
      'idProfessionals',
           'nameProfessionals',
           'bioProfessionals',
           'addressProfessionals,
           phoneProfessionals',
            'nameBusinessProfessionals',
            'createdProfessionals',
            'updatedProfessionals',
           'idUsers', 
    ];

    public function services()
{
    return $this->hasMany(Service::class, 'idProfessionals');
}

}