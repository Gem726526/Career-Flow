import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { setUser } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks";

export default function LoginPage() {
    const dispatch = useAppDispatch();

    const handleLogin = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        dispatch(
            setUser({
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
            })
        );

    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950">
            <button
                onClick={handleLogin}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-500"
            >
                Sign in with Google
            </button>
        </div>
    );
}
