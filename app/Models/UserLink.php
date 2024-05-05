<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLink extends Model
{
    use HasFactory;
    protected $table = 'user_links';

    protected $fillable = [
        'user_id',
        'link_id',
    ];

    protected $hidden = [
    ];
    public function link()
    {
        return $this->belongsTo(Link::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
