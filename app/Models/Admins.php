<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admins extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $appends = ['role'];

    public function getRoleAttribute()
    {
        return 'admin';
    }


    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'recipient_id');
    }
}
