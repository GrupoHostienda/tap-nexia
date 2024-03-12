<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class User extends Model
{
    use HasFactory, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'description',
        'bg_image',
        'profile_image',
    ];

    public function items() { 
        return $this->hasMany(UserItem::class);
    }

}
