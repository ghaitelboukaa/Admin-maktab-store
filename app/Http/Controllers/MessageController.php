<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Auth;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    //

    public function sendMessage(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'content' => 'required|string',
            // 'recipient_id' => 'required|exists:admins,id', // Assuming recipient is an admin
            'subject' => 'required|string',
        ]);

        // Create a new message
        $message = new Message();
        $message->content = $validatedData['content'];
        $message->recipient_id = 1;
        $message->subject = $validatedData['subject'];
        $message->sender_id = auth()->user()->id;
        $message->save();

        return response()->json(['message' => 'Message sent successfully'], 200);
    }
    public function index()
    {
        $admin = Auth::user();
        $messages = Message::with('sender')->orderByDesc('created_at')->get();
        $unreadCount = Message::where('recipient_id', $admin->id)->where('status', 'unread')->count();


        return response()->json(['messages' => $messages, 'unreadCount' => $unreadCount], 200);

    }


    public function markAsRead($id)
    {
        $message = Message::with('sender')->findOrFail($id);
        $message->status = 'in_progress';
        $message->save();

        return response()->json(['message' => $message], 200);
    }
}
