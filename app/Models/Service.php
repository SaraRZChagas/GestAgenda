<?php

// app/Models/Service.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Service extends Model
{
    protected $table = 'Services';
    protected $primaryKey = 'idServices';
    public $timestamps = true;

    protected $fillable = [
    'idProfessionals',
    'idServicesTypes',
    'nameServices',
    'descriptionServices',
    'priceServices',
    'durationMinutesServices',
    'isActiveServices',
    'profile_photo',
    'cover_photo',
    'created_at',
    'updated_at',     
       
    ];


    public function professional()
    {
        return $this->belongsTo(Professional::class, 'idProfessionals');
    }
    public function serviceType()
    {
        return $this->belongsTo(ServicesType::class, 'idServicesTypes');
    }

  
}
