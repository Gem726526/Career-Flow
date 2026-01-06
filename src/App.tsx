import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./services/firebase";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setUser } from "./features/auth/authSlice";
import LoginPage from "./pages/LoginPage";
import AppShell from "./pages/AppShell";
import Loader from "./components/Loader";

export default function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [authChecked, setAuthChecked] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setAuthChecked(false);

      if (!currentUser) {
        dispatch(setUser(null));
        setAuthChecked(true);
        return;
      }

      dispatch(
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        })
      );
      setAuthChecked(true);
    });

    return () => unsub();
  }, [dispatch]);


  if (!authChecked) return <Loader />;
  if (authChecked) {
    if (!user) {
      return <LoginPage />;

    }
  }
  return <AppShell />;
}
