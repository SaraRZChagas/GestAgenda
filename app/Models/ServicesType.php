<?php


namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class ServicesType extends Model
{
    protected $table = 'servicestypes'; // Nome real da tabela no banco
    protected $primaryKey = 'idServicesTypes'; // Nome da chave primária personalizada
    public $timestamps = true; // Caso não use created_at / updated_at

    protected $fillable = [
        'nameServicesTypes',        
        // adicione outros campos se houver
    ];

    // Relacionamento: Um tipo pode ter vários serviços
    public function services()
    {
        return $this->hasMany(Service::class, 'idServicesTypes', 'idServicesTypes');
    }
    // Se precisar de um relacionamento inverso
    public function service()
    {
        return $this->belongsTo(Service::class, 'idServicesTypes', 'idServicesTypes');
    }
    
}
