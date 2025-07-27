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
        
        'nameCustomers',        
        'phoneCustomers',
        'addressCustomers',
        'created_at',
        'updated_at',
        'profile_photo',
        'idUsers', // Assuming this is the foreign key to the Users table
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'idUsers', 'id'); 
    }
    public function contacts()
    {
        return $this->hasMany(Contact::class, 'idCustomers', 'idCustomers');
    }
}
