<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notebook extends Model
{
    use HasFactory;

    protected $fillable = ['size', 'number_of_pages', 'brand', 'products_id'];

    public function product()
    {
        return $this->belongsTo(Products::class);
    }

}
