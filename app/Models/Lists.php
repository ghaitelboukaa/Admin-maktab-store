<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lists extends Model
{
    use HasFactory;

    protected $fillable = ['list_name', 'school', 'level'];

    // Define the many-to-many relationship with Product model
    public function products()
    {
        return $this->belongsToMany(Products::class);
    }
}
