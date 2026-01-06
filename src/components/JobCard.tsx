import type { Job } from "../features/jobs/jobTypes";
import { Draggable } from "@hello-pangea/dnd";


interface JobCardProps {
    job: Job;
    index: number;
    onClick?: (jobId: string) => void;
}

export default function JobCard({ job, index, onClick }: JobCardProps) {
    return (
        <Draggable draggableId={job.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onClick?.(job.id)}
                    className="rounded-lg border border-slate-700 bg-slate-800 p-3 shadow-sm"
                >
                    <p className="font-medium">{job.company}</p>
                    <p className="text-sm text-slate-400">{job.position}</p>

                    {job.location && (
                        <p className="mt-1 text-xs text-slate-500">{job.location}</p>
                    )}

                    {job.contactLink && (
                        <p className="mt-1 text-xs text-slate-500 truncate">{job.contactLink}</p>

                    )}

                    {job.jobLink && (
                        <p className="mt-1 text-xs text-slate-500 truncate">{job.jobLink}</p>
                    )}
                </div>
            )}
        </Draggable>
    );
}

