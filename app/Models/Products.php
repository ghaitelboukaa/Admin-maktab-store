<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'newprice',
        'category_id',
        'quantity',
        'image',
    ];

    public function ratings()
    {
        return $this->hasMany(Rating::class, 'product_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function book()
    {
        return $this->hasOne(Book::class);
    }
    public function notebookk()
    {
        return $this->hasOne(Notebook::class,);
    }
    public function school_supply()
    {
        return $this->hasOne(SchoolSupply::class);
    }

    public function topProduct()
    {
        return $this->hasOne(TopProducts::class, 'product_id');
    }

    public function lists()
{
    return $this->belongsToMany(Lists::class);
}
}
