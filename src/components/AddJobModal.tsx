import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { createJob } from "../features/jobs/jobSlice"
import type { JobStatus } from "../features/jobs/jobTypes";

interface AddJobModalProps {
    onClose: () => void;
}

export default function AddJobModal({ onClose }: AddJobModalProps) {
    const dispatch = useAppDispatch();

    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState<JobStatus>("wishlist");
    const [location, setLocation] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactLink, setContactLink] = useState("");
    const [jobLink, setJobLink] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(
            createJob({
                company,
                position,
                status,
                location,
                contactName,
                contactLink,
                jobLink,
            })
        );

        onClose(); // close modal after save
    };

    return (
        <div className="fixed w-full inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-xl bg-slate-900 p-6">
                <h2 className="mb-4 text-lg font-semibold">Add Job</h2>

                <form onSubmit={handleSubmit} className="w-full space-y-4 ">
                    <div className="flex gap-4">
                        <div>

                            <label className="text-xs font-medium text-slate-300">
                                Company
                            </label>
                            <input
                                className="w-full rounded bg-slate-800 p-2 text-sm"
                                placeholder="Company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                            />
                            <label className="text-xs font-medium text-slate-300">
                                Position
                            </label>
                            <input
                                className="w-full rounded bg-slate-800 p-2 text-sm"
                                placeholder="Position"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                required
                            />
                            <label className="text-xs font-medium text-slate-300">
                                Location
                            </label>
                            <input
                                className="w-full rounded bg-slate-800 p-2 text-sm"
                                placeholder="Location (optional)"
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
                                placeholder="Contact Name (optional)"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                required
                            />

                            <label className="text-xs font-medium text-slate-300">
                                Contact Link
                            </label>
                            <input
                                className="w-full rounded bg-slate-800 p-2 text-sm"
                                placeholder="Contact Link (optional)"
                                value={contactLink}
                                onChange={(e) => setContactLink(e.target.value)}
                                required
                            />

                            <label className="text-xs font-medium text-slate-300">
                                Job Link
                            </label>
                            <input
                                className="w-full rounded bg-slate-800 p-2 text-sm"
                                placeholder="Job Link (optional)"
                                value={jobLink}
                                onChange={(e) => setJobLink(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
