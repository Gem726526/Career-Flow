
import { Droppable } from "@hello-pangea/dnd";
import type { JobStatus } from "../features/jobs/jobTypes";
import { useAppSelector } from "../hooks";
import type { RootState } from "../store";
import JobCard from "./JobCard";

interface ColumnProps {
    status: JobStatus;
    title: string;
    onJobClick: (jobId: string) => void;
}

export default function Column({ status, title, onJobClick }: ColumnProps) {
    const jobs = useAppSelector((state: RootState) =>
        state.jobs.items.filter((job) => job.status === status)
    );

    return (
        <div className="rounded-xl bg-slate-900 p-4">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">
                {title} ({jobs.length})
            </h2>

            <Droppable droppableId={status}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="space-y-3 min-h-[40px]"
                    >
                        {jobs.map((job, index) => (
                            <JobCard key={job.id} job={job} index={index} onClick={onJobClick} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        </div>
    );
}
