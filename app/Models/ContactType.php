<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactType extends Model
{
    protected $table = 'ContactsTypes';
    protected $primaryKey = 'idContactsTypes';
    public $timestamps = false;

    protected $fillable = [
        'nameContactsTypes',
    ];

    // Relacionamento reverso: contatos deste tipo
    public function contacts()
    {
        return $this->hasMany(Contact::class, 'idContactsTypes', 'idContactsTypes');
    }
}
