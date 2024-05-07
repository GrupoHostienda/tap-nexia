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
        'isHidden',
    ];

    protected $hidden = [
        "created_at",
        "updated_at"
    ];

    protected $with = [
        'style',
        'type'
    ];

    /**
     * Get the schema that owns the LinkType.
     */
    public function style()
    {
        return $this->hasOne(LinkStyle::class);
    }

    public function type()
    {
        return $this->belongsTo(LinkType::class, 'link_type_id', 'id');
    }

    public function userLinks()
    {
        return $this->hasMany(UserLink::class);
    }

}
