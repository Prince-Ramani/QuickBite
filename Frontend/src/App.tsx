import "./index.css";

import { useQuery } from "react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthUser } from "./Context/use-auth-user";

import type { userInterface } from "./lib/types";
import type { ApiError } from "./lib/types";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ShopAccount from "./pages/ShopAccount";
import Loading from "./Custom_Components/Loading";
import SettingsLayout from "./pages/settings/SettingsLayout";
import Account from "./pages/settings/Account";
import Profile from "./pages/settings/Profile";
function App() {
  const { setAuthUser } = useAuthUser();
  const { data, isLoading } = useQuery<userInterface | ApiError>({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await fetch("/api/getMe");
      const data: userInterface | ApiError = await res.json();

      if (!!data && "_id" in data) setAuthUser(data);
      return data;
    },
    retry: false,
  });

  const isAuthUser = !!data && "_id" in data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/sign-up"
          element={isAuthUser ? <Navigate to="/settings" /> : <Signup />}
        />

        <Route
          path="/sign-in"
          element={isAuthUser ? <Navigate to="/settings" /> : <Signin />}
        />

        <Route
          path="/settings"
          element={isAuthUser ? <SettingsLayout /> : <Signin />}
        >
          <Route
            path="profile"
            element={isAuthUser ? <Profile /> : <Signin />}
          />

          <Route
            path="account"
            element={isAuthUser ? <Account /> : <Signin />}
          />
        </Route>
        <Route
          path="*"
          element={isAuthUser ? <ShopAccount /> : <Navigate to="/sign-up" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
