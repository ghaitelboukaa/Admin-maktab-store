<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'level', 'products_id'];

    public function product()
    {
        return $this->belongsTo(Products::class);
    }
}
