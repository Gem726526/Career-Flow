import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchJobs } from "../features/jobs/jobSlice.ts";
import Board from "../components/Board.tsx";
import { useState } from "react";
import AddJobModal from "../components/AddJobModal";


export default function AppShell() {
    const user = useAppSelector((s) => s.auth.user);
    const dispatch = useAppDispatch();
    const { loading, error, items } = useAppSelector((s) => s.jobs);
    const [isAddOpen, setIsAddOpen] = useState(false);


    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);



    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <header className="mx-auto flex max-w-5xl justify-between px-4 py-8">
                <div >
                    <h1 className="text-3xl font-bold tracking-tight">CareerFlow</h1>
                    <p className="mt-1 text-slate-300 text-sm">
                        Signed in as {user?.email ?? "Unknown"}
                    </p>
                </div>
                <div className="mx-auto max-w-5xl px-4">
                    {loading && <p className="text-slate-300">Loading jobs...</p>}
                    {error && <p className="text-red-400">{error}</p>}
                    <p className="mt-4 text-slate-300">Jobs loaded: {items.length}</p>
                </div>


                <button
                    onClick={() => signOut(auth)}
                    className="rounded-lg bg-slate-800 px-4 py-2 hover:bg-slate-700 mx-4"
                >
                    Sign out
                </button>

                <button
                    onClick={() => setIsAddOpen(true)}
                    className="rounded-lg bg-emerald-600 px-4 py-2 hover:bg-emerald-500"
                >
                    + Add Job
                </button>
                {isAddOpen && <AddJobModal onClose={() => setIsAddOpen(false)} />}

            </header>
            <Board />

        </div>
    );
}
