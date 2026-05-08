import {useEffect, useState} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import api from "../../api/axios";
import NoteItem from "./NoteItem.tsx";

interface Note {
    id: number;
    title: string;
    content: string;
    updated_at: string;
    priority: string;
}

interface NoteItemProps {
    user_id?: number | undefined,
    notes: Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    showToast?: (text: string, type: ("success" | "error")) => void
}

export default function NoteList({user_id, notes, setNotes, showToast}: NoteItemProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const getNotes = async () => {
            try {
                const resp = await api.get(`/Notes/${user_id}`);
                setNotes(resp.data);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError("Failed to fetch notes");
            } finally {
                setLoading(false);
            }
        };
        if (user_id) getNotes();
    }, [user_id]);
    if (loading) return <p className={"flex items-center justify-center bg-[#E0E4F1] text-xl font-bold pt-25"}>Loading...</p>;
    if (error) return <p className={"flex items-center justify-center bg-[#E0E4F1] text-xl font-bold pt-25"}>{error}</p>;
    return (
        <div className="flex flex-row gap-5 overflow-x-auto pb-4 no-scrollbar">
            {notes.map((note, index) => (
                <NoteItem showToast={showToast} key={note.id} index={index} note={note} setNotes={setNotes} user_id={user_id}/>
            ))}
        </div>
    );
}