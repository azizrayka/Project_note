<?php

namespace App\Http\Controllers;
use App\Models\Notes;
use Illuminate\Http\Request;
use Laravel\Prompts\Note;

class NotesController extends Controller
{
    function getNotes(Request $request)
    {
        return Notes::where('user_id', $request->route('user_id'))->orderBy('created_at', 'desc')->get();
    }
    function createNote(Request $request, $user_id)
    {
        $note = Notes::create([
            'user_id'  => $user_id,
            'title'    => $request->input('title'),
            'content' => $request->input('content') ?? '',
            'priority' => $request->input('priority'),
        ]);

        return response()->json($note, 201);
    }
    function deleteNote(Request $request)
    {
        $note = Notes::where('user_id', $request->route('user_id'))->where('id', $request->route('id'))->first();
        $note->delete();
        return response()->json(null, 204);
    }
    function updateNote(Request $request, $user_id ,$id)
    {
        $note = Notes::where('user_id', $user_id)->where('id', $id)->firstOrFail();
        $note->update([
            'title'    => $request->input('title'),
            'content'  => $request->input('content'),
            'priority' => $request->input('priority'),
        ]);
        return response()->json($note, 200);
    }

    public function getNoteBytitle(string $user_id, string $title)
    {
        $notes = Notes::where('user_id', $user_id)->where('title', $title)->get();
        if ($notes->isEmpty()) {
            return response()->json(['message' => 'No notes found'], 404);
        }
        return response()->json($notes, 200);
    }

    public function getNoteBypriority(string $user_id, string $priority)
    {
        $note = Notes::where('user_id', $user_id)->where('priority', $priority)->get();
        if ($note->isEmpty()) {
            return response()->json(['message' => 'No notes found'], 404);
        }
        return response()->json($note, 200);
    }

    public function getNoteBydate(string $user_id, string $date)
    {
        $note = Notes::where('user_id', $user_id)->whereDate('created_at', $date)->get();
        if ($note->isEmpty()) {
            return response()->json(['message' => 'No notes found'], 404);
        }
        return response()->json($note, 200);
    }
}
