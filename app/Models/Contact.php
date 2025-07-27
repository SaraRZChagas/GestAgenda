<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $table = 'Contacts';
    protected $primaryKey = 'idContacts';
    public $timestamps = false;  

    protected $fillable = [
        'descContacts',
        'idContactsTypes',
        'isActiveContacts',
        'idCustomers',
        'idProfessionals',
    ];

    // Tipo do contato
    public function contactType()
    {
        return $this->belongsTo(ContactType::class, 'idContactsTypes', 'idContactsTypes');
    }

    // Relacionamento com Customer
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'idCustomers', 'idCustomers');
    }

    // Relacionamento com Professional
    public function professional()
    {
        return $this->belongsTo(Professional::class, 'idProfessionals', 'idProfessionals');
    }
}
