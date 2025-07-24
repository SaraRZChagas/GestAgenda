<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    //
    protected $table = 'Customers';
    protected $primaryKey = 'idCustomers';
    public $timestamps = true;
    protected $fillable = [
        'idCustomers',
        'nameCustomers',        
        'phoneCustomers',
        'addressCustomers',
        'createdCustomers',
        'updatedCustomers',
        'profile_photo',
        'idUsers', // Assuming this is the foreign key to the Users table
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'idUsers', 'id'); // Assuming 'idUsers' is the foreign key in Customers table
    }
}
