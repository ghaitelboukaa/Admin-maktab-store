<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Rating;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getStats()
    {

        $sales = Order::where('status', 'completed')->count();
        $earning = Order::where('status', 'completed')->sum('total_amount');
        $comments = Rating::whereDate('created_at', Carbon::today())->count();
        // Dummy data, replace with actual queries
        $data = [
            'dailyViews' => 1504,
            'sales' => $sales,
            'comments' => $comments,
            'earning' =>  $earning,
        ];

        return response()->json($data);
    }
}
