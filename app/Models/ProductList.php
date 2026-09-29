<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductList extends Model
{
    use HasFactory;

    public function list()
    {
        return $this->belongsTo(Lists::class, 'lists_id');
    }
}
