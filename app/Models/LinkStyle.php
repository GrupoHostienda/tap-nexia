<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LinkStyle extends Model
{
    protected $fillable = [
        'link_id',
        'style',
    ];
    protected $casts = [
        'style' => 'array', // Will convarted to (Array)
    ];
    /**
     * Get the schema that owns the LinkType.
     */
    public function link()
    {
        return $this->belongsTo(Link::class);
    }


}
