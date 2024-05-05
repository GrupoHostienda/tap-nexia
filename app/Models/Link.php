<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $fillable = [
        'link_type_id',
        'title',
        'url',
    ];

    protected $hidden = [
    ];

    /**
     * Get the schema that owns the LinkType.
     */
    public function style()
    {
        return $this->hasMany(LinkStyle::class);
    }

    public function userLinks()
    {
        return $this->hasMany(UserLink::class);
    }

}
