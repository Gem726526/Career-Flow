
import Column from "./Column"
import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAppDispatch, useAppSelector } from "../hooks";
import { moveJob, moveJobLocal } from "../features/jobs/jobSlice"
import { useState } from "react";
import EditJobModal from "./EditJobModal";
import type { JobStatus } from "../features/jobs/jobTypes";
import Loader from "./Loader";



const STATUSES = [
    { key: "wishlist", title: "Wishlist" },
    { key: "applied", title: "Applied" },
    { key: "interviewing", title: "Interviewing" },
    { key: "offer", title: "Offer" },
    { key: "rejected", title: "Rejected" },
] as const;




export default function Board() {
    const dispatch = useAppDispatch();
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    const selectedJob = useAppSelector(
        (s) => s.jobs.items.find((j) => j.id === selectedJobId) ?? null
    );

    const isLoading = useAppSelector((s) => s.jobs.loading);



    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId) return;

        const newStatus = destination.droppableId as JobStatus;

        dispatch(moveJobLocal({ id: draggableId, status: newStatus }));

        dispatch(moveJob({ id: draggableId, status: newStatus }));
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-5">
                        {STATUSES.map((col) => (
                            <Column
                                key={col.key}
                                status={col.key}
                                title={col.title}
                                onJobClick={(jobId) => setSelectedJobId(jobId)}
                            />
                        ))}
                    </div>
                </DragDropContext>
            )}

            {selectedJob && (
                <EditJobModal job={selectedJob} onClose={() => setSelectedJobId(null)} />
            )}
        </>

    );
}

