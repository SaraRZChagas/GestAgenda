<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $table = 'Appointments'; 
    protected $primaryKey = 'idAppointments';
    public $timestamps = true;
    
    protected $fillable = [
        'idProfessionals',
        'idCustomers',
        'idServices',
        'startDatetimeAppointments',
        'endDatetimeAppointments',
        'statusAppointments',
        'notesAppointments',
    ];

    public function professional()
    {
        return $this->belongsTo(Professional::class, 'idProfessionals', 'idProfessionals');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'idCustomers', 'idCustomers');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'idServices', 'idServices');
    }
}
