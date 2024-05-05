<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;


    protected $fillable = [
        'username',
        'email',
        'password',
        'cover',
        'role',
    ];

    protected $hidden = [
        'password',
    ];


    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
    public function userLinks()
    {
        return $this->hasMany(UserLink::class);
    }
    public function links()
    {
        return $this->hasManyThrough(
            Link::class,
            UserLink::class,
            'user_id', // Foreign key on UserLink table
            'id',       // Local key on Link table
            'id',       // Local key on User table
            'link_id'  // Foreign key on Link table
        );
    }
}
