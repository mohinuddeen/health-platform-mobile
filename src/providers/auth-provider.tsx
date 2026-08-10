//health-platform-mobile/src/providers/auth-provider.tsx
import {
  createContext,
  useEffect,
  useState,
} from "react";

import { useDispatch } from "react-redux";

import {
  restoreSession,
} from "@/src/store/slices/authSlice";

import {
  getAuthData,
} from "@/src/utils/authStorage";


export const AuthContext = createContext(null);



export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function restore() {

      const auth =
        await getAuthData();


      if (auth) {

        dispatch(
          restoreSession(auth)
        );

      }


      setLoading(false);

    }


    restore();

  }, []);



  if (loading) {
    return null;
  }


  return (
    <AuthContext.Provider value={null}>
      {children}
    </AuthContext.Provider>
  );

}