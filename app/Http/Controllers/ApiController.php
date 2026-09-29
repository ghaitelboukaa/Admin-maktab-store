<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
// Your logic to fetch data
public function getData()
    {
        // Your logic to fetch data
        $data = ['item1', 'item2', 'item3'];

        return response()->json($data);
    }
}
