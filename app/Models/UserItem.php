<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserItem extends Model
{
    use HasFactory;
    
        /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_items';


    protected $fillable = [
        'text_color',
        'bg_color',
        'bg_image',
        'url',
        'icon',
            ];

    public function user() {
        return $this->belongsTo(User::class);
    };
}
