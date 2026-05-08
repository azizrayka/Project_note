import {NoteIcon} from "@phosphor-icons/react";
import {useState} from "react";
import NoteList from "../Note/NoteList.tsx";
import NoteForm from "../Note/NoteForm.tsx";
import Search from "../Search/Search.tsx";

interface Note {
    id: number;
    title: string;
    content: string;
    updated_at: string;
    priority: string;
}
interface HomeContentProps {
    id?: number | undefined,
    searching?: boolean
}

export default function HomeContent({id, searching}: HomeContentProps) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [toast, setToast] = useState<{ text: string; type: "success" | "error" } | null>(null);

    const showToast = (text: string, type: "success" | "error") => {
        setToast({ text, type });
        setTimeout(() => setToast(null), 3000);
    };
    const addNote = (note: Note) => {
        setNotes(prev => [...prev, note]);
    };
    return (
        <>
            {toast && (
                <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-md shadow-lg text-white font-medium
        ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                    {toast.text}
                </div>
            )}
            {searching
            ? <Search user_id={id}/>
            : <div className="bg-[#E0E4F1] min-h-screen w-full overflow-y-auto">
                <NoteForm id={id} onNoteCreated={addNote} showToast={showToast}/>
                <div className="flex flex-col gap-5 p-10 h-auto w-auto mx-5">
                    <span className="font-bold flex flex-row gap-2">
                        <NoteIcon size={30}/>My Notes
                    </span>
                    <NoteList showToast={showToast} notes={notes} setNotes={setNotes} user_id={id}/>
                </div>
            </div>}
        </>
    );
}