import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { deleteJob, deleteJobLocal, updateJob, updateJobLocal } from "../features/jobs/jobSlice";
import type { Job, JobStatus } from "../features/jobs/jobTypes";

interface EditJobModalProps {
    job: Job;
    onClose: () => void;
}

export default function EditJobModal({ job, onClose }: EditJobModalProps) {
    const dispatch = useAppDispatch();

    const [company, setCompany] = useState(job.company);
    const [position, setPosition] = useState(job.position);
    const [status, setStatus] = useState<JobStatus>(job.status);
    const [location, setLocation] = useState(job.location ?? "");
    const [contactName, setContactName] = useState(job.contactName ?? "");
    const [contactLink, setContactLink] = useState(job.contactLink ?? "");
    const [jobLink, setJobLink] = useState(job.jobLink ?? "");

    const handleSave = () => {
        const updatedJob: Job = {
            ...job,
            company,
            position,
            status,
            location,
            contactName,
            contactLink,
            jobLink,
        };

        dispatch(updateJobLocal(updatedJob));
        dispatch(updateJob(updatedJob));
        onClose();
    };

    const handleDelete = () => {
        dispatch(deleteJobLocal(job.id));
        dispatch(deleteJob(job.id));
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-xl bg-slate-900 p-6">
                <h2 className="mb-4 text-lg font-semibold">Edit Job</h2>

                <div className="space-y-4 ">
                    <div className="flex gap-4">
                        <div>

                            <label className="text-xs font-medium text-slate-300">
                                Company
                            </label>
                            <input
                                className="w-full rounded bg-slate-800 p-2 text-sm"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                            <label className="text-xs font-medium text-slate-300">
                                Position
                            </label>
                            <input
                                className="w-full rounded bg-slate-800 p-2 text-sm"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                            />
                            <label className="text-xs font-medium text-slate-300">
                                Location
                            </label>
                            <input
                                className="w-full rounded bg-slate-800 p-2 text-sm"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <label className="text-xs font-medium text-slate-300">
                                Status
                            </label>

                            <select
                                className="w-full rounded bg-slate-800 p-2 text-sm"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as JobStatus)}
                            >
                                <option value="wishlist">Wishlist</option>
                                <option value="applied">Applied</option>
                                <option value="interviewing">Interviewing</option>
                                <option value="offer">Offer</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <div>

                            <label className="text-xs font-medium text-slate-300">
                                Contact Name
                            </label>
                            <input
                                className="w-full rounded bg-slate-800 p-2 text-sm"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                            />

                            <label className="text-xs font-medium text-slate-300">
                                Contact Link
                            </label>
                            <input
                                className="w-full rounded bg-slate-800 p-2 text-sm"
                                value={contactLink}
                                onChange={(e) => setContactLink(e.target.value)}
                            />
                            <label className="text-xs font-medium text-slate-300">
                                Job Link
                            </label>


                            <input
                                className="w-full rounded bg-slate-800 p-2 text-sm"
                                value={jobLink}
                                onChange={(e) => setJobLink(e.target.value)}
                            />

                        </div></div>

                    <div className="flex justify-between pt-4">
                        <button
                            onClick={handleDelete}
                            className="text-sm text-red-400 hover:underline"
                        >
                            Delete
                        </button>

                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="rounded px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                className="rounded bg-blue-600 px-4 py-2 text-sm hover:bg-blue-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
