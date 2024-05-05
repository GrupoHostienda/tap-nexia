<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;


class LinkType extends Model
{
    use HasFactory;

    protected $table = 'link_types';

    protected $fillable = [
        'name',
        'hasSchema',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function setSchema(bool $value)
    {
        $this->hasSchema = $value;
        $this->save();
    }
    /**
     * Get the schema that owns the LinkType.
     */
    public function schemas()
    {
        return $this->hasMany(LinkSchema::class);
    }
    public function links()
    {
        return $this->hasMany(Link::class);
    }
}
