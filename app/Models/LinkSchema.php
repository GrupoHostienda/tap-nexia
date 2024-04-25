<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LinkSchema extends Model
{
    use HasFactory;

    protected $table = 'link_schemas';

    protected $fillable = [
        'link_type_id',
        'property',
        'options',
    ];
    protected $casts = [
        'options' => 'array', // Will convarted to (Array)
    ];
    protected $with = [
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
        'link_type_id',
    ];


    /**
     * Get the type associated with the linkSchema.
     */
    public function type(): BelongsTo
    {
        return $this->belongsTo(LinkType::class,'link_type_id','id');
    }

}
