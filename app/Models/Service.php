<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $primaryKey = 'idServices'; // pois o campo de ID tem nome diferente
    public $incrementing = true;

    protected $fillable = [
        'idProfessionals',
        'idServicesTypes',
        'nameServices',
        'descriptionServices',
        'priceServices',
        'durationMinutesServices',
        'isActiveServices'
    ];

    public function professional()
    {
        return $this->belongsTo(Professional::class, 'idProfessionals', 'idProfessionals');
    }
}
