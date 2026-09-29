<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
        'full_name',
        'mobile_number',
        'shipping_city',
        'shipping_address',
        'total_amount'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
    

    public function payment()
    {
        return $this->hasOne(Payment::class, 'payment_id', 'payment_id');
    }
}
