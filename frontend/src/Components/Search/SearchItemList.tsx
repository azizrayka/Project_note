// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import api from "../../api/axios";
import { useEffect, useState } from "react";

interface Note {
    id: number;
    title: string;
    content: string;
    updated_at: string;
    priority: string;
}

export default function SearchItemList({ user_id, current, search }: {
    user_id?: number;
    current?: string;
    search?: string;
}) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const controller = new AbortController();
        const getNotes = async () => {
            if (!search?.trim() || !current) {
                setNotes([]);
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                setError(null);
                let searchPath = encodeURIComponent(search);
                if (current === "searchbypriority") {
                    const lowerSearch = search.toLowerCase().trim();
                    let color;
                    if (lowerSearch === "haute") color = "bg-red-500";
                    else if (lowerSearch === "moyenne") color = "bg-orange-500";
                    else if (lowerSearch === "basse") color = "bg-green-500";
                    if (!color) {
                        setNotes([]);
                        setLoading(false);
                        return;
                    }
                    searchPath = color;
                }
                const resp = await api.get(`/Notes/${user_id}/${current}/${searchPath}`, {
                    signal: controller.signal,
                });
                setNotes(resp.data);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
            } catch (err:never) {
                if (err.name === "CanceledError" || err.name === "AbortError") return;
                setError("Failed to fetch notes");
            } finally {
                setLoading(false);
            }
        };
        if (user_id) getNotes();
        return () => controller.abort();
    }, [user_id, search, current]);
    if (loading) return <p className={"flex items-center justify-center text-xl font-bold py-15"}>Loading...</p>;
    if (error)   return <p className={"flex items-center justify-center text-xl font-bold py-15"}>{error}</p>;
    return (
        <div className="grid grid-cols-3 w-[90%] mt-10 bg-white p-5 rounded-md gap-5 h-fit">
            {notes.length === 0 ? (
                <p className="text-gray-400 col-span-3 text-center pb-9">No notes found.</p>
            ) : (
                notes.map((note) => (
                    <div key={note.id} className="flex flex-col gap-2 bg-[#203562] rounded-md p-5 mb-10">
                        <p className="text-2xl text-white font-medium truncate">{note.title}</p>
                        <p className="text-sm text-white w-full h-20 overflow-auto">{note.content}</p>
                        <span className="text-white">{note.updated_at.substring(0, 10)}</span>
                        <div className={`${note.priority} w-full h-2 rounded-full`} />
                    </div>
                ))
            )}
        </div>
    );
}