<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolSupply extends Model
{
    use HasFactory;
    protected $fillable = ['type', 'size', 'name', 'brand', 'products_id'];

    public function product()
    {
        return $this->belongsTo(Products::class);
    }
}
