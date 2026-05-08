import {PencilIcon, TrashIcon} from "@phosphor-icons/react";
import {useEffect, useState} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import api from "../../api/axios";

interface Note {
    id: number;
    title: string;
    content: string;
    updated_at: string;
    priority: string;
}

interface NoteItemProps {
    index: number,
    note: Note,
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    user_id?: number | undefined,
    showToast?: ((text: string, type: ("success" | "error")) => void) | undefined
}

export default function NoteItem({user_id, index, note, setNotes, showToast}: NoteItemProps) {
    const [titleupd, setTitleupd] = useState("");
    const [contentupd, setContentupd] = useState("");
    const [priorityupd, setPriorityupd] = useState("");
    useEffect(() => {
        const getNotes = async () => {
            try {
                const resp = await api.get(`/Notes/${user_id}`);
                setNotes(resp.data);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                console.log("Failed to fetch notes");
            }
        };
        if (user_id) getNotes();
    }, [user_id]);

    async function handleUpdate(note: Note) {
        try {
            const payload = {
                title: titleupd || note.title,
                content: contentupd || note.content,
                priority: priorityupd || note.priority
            };
            const resp = await api.put(`/Notes/${user_id}/${note.id}`, payload);
            setNotes(prevNotes => prevNotes.map(n => n.id === note.id ? resp.data : n));
            setTitleupd("");
            setContentupd("");
            setPriorityupd("");
            if (showToast) {
                showToast("Note updated successfully!", "success");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            if (showToast) {
                showToast("Failed to update note.", "error");
            }
        }
    }

    const deleteNote = async (id_note: number) => {
        try {
            await api.delete(`/Notes/${user_id}/${id_note}`);
            setNotes(prevNotes => prevNotes.filter(note => note.id !== id_note));
            if (showToast) {
                showToast("Note deleted successfully!", "success");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            if (showToast) {
                showToast("Failed to delete note.", "error");
            }
        }
    }
    return (
        <div key={index} className="flex flex-col gap-2 bg-[#203562] w-90 h-60 rounded-md p-5 shrink-0">
                            <span className={"text-2xl text-white font-medium flex flex-row gap-3 h-8"}>
                                <textarea maxLength={100} defaultValue={note.title}
                                          onChange={(e) => setTitleupd(e.target.value)}
                                          className={"size-9 grow resize-none outline-none"}></textarea>
                                <div><button onClick={() => {
                                    handleUpdate(note)
                                }} className={"cursor-pointer"}><PencilIcon size={20}/></button>
                                </div>
                                <div><button onClick={() => deleteNote(note.id)} className={"cursor-pointer"}><TrashIcon
                                    size={20}/></button></div>
                            </span>
            <textarea defaultValue={note.content} onChange={(e) => setContentupd(e.target.value)}
                      className={"text-sm text-white w-full h-max grow resize-none outline-none"}
            ></textarea>
            <span className={"text-white"}>{note.updated_at.substring(0, 10)}</span>
            <div className={`${[note.priority]} w-full h-2 rounded-full`}></div>
            <div className={"flex flex-row items-center gap-3 -mb-3"}>
                <span className={"text-white"}>Priority Level</span>
                <input onClick={() => setPriorityupd("bg-green-500")} name={`priority-${note.id}`} type="radio"
                       className={"size-4 accent-green-500"}/>
                <input onClick={() => setPriorityupd("bg-orange-500")} name={`priority-${note.id}`} type="radio"
                       className={"size-4 accent-orange-500"}/>
                <input onClick={() => setPriorityupd("bg-red-500")} name={`priority-${note.id}`} type="radio"
                       className={"size-4 accent-red-500"}/>
            </div>
        </div>
    );
}