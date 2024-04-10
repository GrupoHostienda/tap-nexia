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


    public function setSchema(bool $value)
    {
        $this->hasSchema = $value;
        $this->save();
    }
    /**
     * Get the schema that owns the LinkType.
     */
    public function schema()
    {
        return $this->hasOne(LinkType::class, 'id', 'link_type_id');
    }

}
