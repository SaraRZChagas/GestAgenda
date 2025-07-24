<?php

// app/Models/Service.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $table = 'Services';
    protected $primaryKey = 'idServices';
    public $timestamps = false;

    protected $fillable = [
        'idProfessionals',
        'idServicesTypes',
        'nameServices',
        'descriptionServices',
        'priceServices',
        'durationMinutesServices',
        'isActiveServices',
        'createdServices',
        'updatedServices',
    ];

    public function professional()
    {
        return $this->belongsTo(Professional::class, 'idProfessionals');
    }
    public function serviceType()
    {
        return $this->belongsTo(ServiceType::class, 'idServicesTypes');
    }

  
}
