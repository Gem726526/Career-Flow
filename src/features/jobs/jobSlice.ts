import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { type Job, type JobStatus } from "./jobTypes";
import type { RootState } from "../../store";

interface JobState {
  items: Job[];
  loading: boolean;
  error: string | null;
}

interface CreateJobInput {
  company: string;
  position: string;
  status: JobStatus;
  location?: string;
  contactName?: string;
  contactLink?: string;
  jobLink?: string;
}

const initialState: JobState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchJobs = createAsyncThunk<Job[], void, { state: RootState }>(
  "jobs/fetchJobs",
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = getState().auth.user?.uid;
      if (!userId) return [];
      const jobsRef = collection(db, "jobs");
      const q = query(
        jobsRef,
        where("userId", "==", userId),
        orderBy("dateAdded", "desc")
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Job, "id">;
        return { id: doc.id, ...data };
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch jobs";
      return rejectWithValue(errorMessage);
    }
  }
);

export const createJob = createAsyncThunk<
  Job,
  CreateJobInput,
  { state: RootState }
>("jobs/createJob", async (input, { getState, rejectWithValue }) => {
  try {
    const userId = getState().auth.user?.uid;
    if (!userId) {
      return rejectWithValue("User Not authenticated");
    }

    const newJobData = {
      userId,
      company: input.company.trim(),
      position: input.position.trim(),
      status: input.status,
      location: input.location?.trim() || "",
      dateAdded: Date.now(),
      contactName: input.contactName?.trim() || "",
      contactLink: input.contactLink?.trim() || "",
      jobLink: input.jobLink?.trim() || "",
    };

    const docRef = await addDoc(collection(db, "jobs"), newJobData);
    return { id: docRef.id, ...newJobData };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create job";
    return rejectWithValue(message);
  }
});

export const moveJob = createAsyncThunk<
  void,
  { id: string; status: Job["status"] },
  { rejectValue: string }
>("jobs/moveJob", async ({ id, status }, { rejectWithValue }) => {
  try {
    await updateDoc(doc(db, "jobs", id), { status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to move job";
    return rejectWithValue(message);
  }
});

export const updateJob = createAsyncThunk<void, Job, { rejectValue: string }>(
  "jobs/updateJob",
  async (job, { rejectWithValue }) => {
    try {
      const { id, ...data } = job;
      await updateDoc(doc(db, "jobs", id), data);
    } catch (err) {
      console.error(err);
      return rejectWithValue("Failed to update job");
    }
  }
);

export const deleteJob = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("jobs/deleteJob", async (id, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, "jobs", id));
  } catch (err) {
    console.error(err);
    return rejectWithValue("Failed to delete job");
  }
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    moveJobLocal(
      state,
      action: { payload: { id: string; status: Job["status"] } }
    ) {
      const job = state.items.find((j) => j.id === action.payload.id);
      if (job) job.status = action.payload.status;
    },

    updateJobLocal(state, action: { payload: Job }) {
      const index = state.items.findIndex((j) => j.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },

    deleteJobLocal(state, action: { payload: string }) {
      state.items = state.items.filter((j) => j.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder

      //FERTCHjkOBS
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Something went wrong";
      })

      //CREATEjoB
      .addCase(createJob.fulfilled, (state, action) => {
        state.items.unshift(action.payload); // newest first
      })
      .addCase(createJob.rejected, (state, action) => {
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Failed to create job";
      });
  },
});
export const { moveJobLocal, updateJobLocal, deleteJobLocal } =
  jobsSlice.actions;

export default jobsSlice;
