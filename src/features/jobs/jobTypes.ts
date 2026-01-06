export type JobStatus =
  | "wishlist"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected";

export interface Job {
  id: string;
  userId: string;
  company: string;
  position: string;
  status: JobStatus;
  location?: string;
  salary?: string;
  notes?: string;
  dateAdded: number; // timestamp (ms)

  contactName?: string;
  contactLink?: string; // LinkedIn, email, etc.
  jobLink?: string;
}
