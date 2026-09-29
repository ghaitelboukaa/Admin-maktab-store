<?php

use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProfileAdminController;
use App\Http\Controllers\TopProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware(['auth:sanctum', 'ability:client'])->prefix('client')->group(static function () {
    Route::get('/', function (Request $request) {
        return $request->user();
    });
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders/{order}/update-status', [OrderController::class, 'updateStatus']);


});

Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(static function () {
    Route::get('/', function (Request $request) {
        $user = $request->user();
        $user->image = asset("images/{$user->image}");
        return response()->json($user);
        // return $request->user();
    });
    Route::post('/update-image', [ProfileAdminController::class, 'updateImage']);
    Route::put('/profile/{id}', [ProfileAdminController::class, 'update']);
    Route::put('/password/{id}', [ProfileAdminController::class, 'changePassword']);

    Route::get('/messages', [MessageController::class, 'index']);
    Route::post('/messages/read/{id}', [MessageController::class, 'markAsRead']);




});


// Route::post('/admin/update-image', [ProfileAdminController::class, 'updateImage']);

Route::delete('/Special-products/{id}', [TopProductController::class, 'destroy']);
Route::get('/get-special-products', [TopProductController::class, 'index']);
Route::post('/Special-products', [TopProductController::class, 'store']);
Route::get('/dashboard-stats', [DashboardController::class, 'getStats']);
Route::get('/admin/orders', [AdminOrderController::class, 'index']);
Route::put('/admin/orders/{order}', [AdminOrderController::class, 'updateStatus']);


Route::post('/messages/send', [MessageController::class, 'sendMessage']);

Route::post('/lists', [ListController::class, 'store']);
Route::get('/getlists', [ListController::class, 'index']);
Route::get('/getlistsById/{listId}', [ListController::class, 'show']);
Route::get('/getProducts', [ProductsController::class, 'index']);

Route::get('/top-rated-products', [ProductsController::class, 'getTopRatedProducts']);

Route::get('/products/{productId}', [ProductsController::class, 'show']);

Route::get('/CtegoryProducts/{categoryId}', [ProductsController::class, 'getProductsByCategory']);


Route::post('/create-products', [ProductsController::class, 'store']);
Route::post('/orders', [OrderController::class, 'store']);

Route::put('/update-products/{productId}', [ProductsController::class, 'update']);

Route::delete('/delete-products/{id}', [ProductsController::class, 'destroy']);
Route::delete('/delete-list/{id}', [ListController::class, 'destroy']);
Route::post('/products/{id}/rate', [ProductsController::class, 'rate']);


require __DIR__ . '/auth.php';




// Route::get('/data', [ApiController::class, 'getData']);

