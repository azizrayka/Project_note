import {useState} from "react";
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

interface NoteFormProps {
    id?: number | undefined,
    onNoteCreated?: (note: Note) => void,
    showToast?: (text: string, type: ("success" | "error")) => void
}

export default function NoteForm({id, onNoteCreated, showToast}: NoteFormProps) {
    const [t, setT] = useState("");
    const [c, setC] = useState("");
    const [p, setP] = useState("");
    const createNote = async (title: string, content: string, priority: string) => {
        try {
            const resp = await api.post(`/Notes/${id}`, {title, content, priority});
            onNoteCreated?.(resp.data);
            if (showToast) {
                showToast("Note created successfully!", "success");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            if (showToast) {
                showToast("Failed to create note.", "error");
            }
        }
    };

    return (
        <form className="flex flex-col gap-3 p-10 bg-white w-90% mt-5 mx-5 rounded-md shadow-md h-auto">
            <span className="text-2xl text-[#203562] font-medium">Add a Note</span>
            <input
                type="text"
                placeholder="Title"
                onChange={(e) => setT(e.target.value)}
                className="border-b-2 border-[#203562] w-full font-medium text-xl outline-none"
                maxLength={100}
            />
            <textarea
                placeholder="Take a note..."
                className="h-30 resize-none outline-none"
                maxLength={100}
                defaultValue=""
                onChange={(e) => setC(e.target.value)}
            />
            <div className="flex flex-row gap-10">
                Priority Level
                <input onClick={() => setP("bg-green-500")} name="priority" type="radio"
                       className="size-6 accent-green-500"/>
                <input onClick={() => setP("bg-orange-500")} name="priority" type="radio"
                       className="size-6 accent-orange-500"/>
                <input onClick={() => setP("bg-red-500")} name="priority" type="radio"
                       className="size-6 accent-red-500"/>
            </div>
            <div className="flex flex-row gap-5">
                <button
                    type="button"
                    onClick={() => createNote(t, c, p)}
                    className="font-bold bg-[#203562] text-white w-1/2 rounded-md p-2 cursor-pointer"
                >
                    add
                </button>
                <button
                    type="reset"
                    className="font-bold bg-[#203562] text-white w-1/2 rounded-md p-2 cursor-pointer"
                >
                    reset
                </button>
            </div>
        </form>
    );
}