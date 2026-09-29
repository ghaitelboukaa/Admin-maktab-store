<?php

namespace App\Http\Controllers;

use App\Models\Admins;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class ProfileAdminController extends Controller
{
    //

    public function update(Request $request, $id)
    {
        $admin = Admins::findOrFail($id);

        $admin->name = $request->input('name');
        $admin->email = $request->input('email');
        // Handle image upload and update logic here

        $admin->save();

        return response()->json(['message' => 'Admin profile updated successfully'], 200);
    }

    public function changePassword(Request $request, $id)
    {
        $admin = Admins::findOrFail($id);

        // Verify current password
        if (!Hash::check($request->input('current_password'), $admin->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }

        // Validate new password
        $request->validate([
            'new_password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required_with:new_password|same:new_password',
        ]);

        // Update password
        $admin->password = Hash::make($request->input('new_password'));
        $admin->save();

        return response()->json(['message' => 'Password changed successfully'], 200);
    }

    public function updateImage(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Get the authenticated user
        $user = auth()->user();

        // Check if user is authenticated
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        // Process the image
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images'), $imageName);

        // Update user's image in the database
        $user->image = $imageName;
        $user->save();

        return response()->json(['message' => 'Image updated successfully'], 200);
    }


}
