<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSocialItem extends Model
{
    use HasFactory;
    
        /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_social_items';

    protected $fillable = [
        'user_id',
        'title',
        'url',
        'icon',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

}
