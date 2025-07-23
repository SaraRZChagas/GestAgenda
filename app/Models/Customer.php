<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = ['phoneCustomers', 'profile_photo', 'idusers'];

    protected $primaryKey = 'idCustomers';
    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class, 'idusers');
    }
}
