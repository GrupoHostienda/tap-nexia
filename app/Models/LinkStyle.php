<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LinkStyle extends Model
{
    protected $fillable = [
        'link_id',
        'class',
    ];
    protected $casts = [
    ];
    protected $hidden = [
        "created_at",
        "updated_at"
    ];
    /**
     * Get the schema that owns the LinkType.
     */
    public function link()
    {
        return $this->belongsTo(Link::class);
    }


}
