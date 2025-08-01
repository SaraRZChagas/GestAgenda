<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'password',
        'role', 
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function professional()
    {
                $returnRelationship = $this->hasOne(Professional::class, 'idUsers', 'id'); 
        \Log::info('Accessing Custormer:', [
            'professional' => $returnRelationship,
        ]);
        return $returnRelationship;
    }

    public function customer()
    {
        $returnRelationship = $this->hasOne(Customer::class, 'idUsers', 'id');
        \Log::info('Accessing Custormer:', [
            'customer' => $returnRelationship,
        ]);
        return $returnRelationship;
    }

    public function isProfessional(): bool
    {
        return $this->role === 'professional';
    }

    public function isCustomer(): bool
    {
        return $this->role === 'client';
    }

};