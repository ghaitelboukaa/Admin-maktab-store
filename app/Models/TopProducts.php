<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopProducts extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'offer'];
    public function product()
    {
        return $this->belongsTo(Products::class, 'product_id');
    }
}
