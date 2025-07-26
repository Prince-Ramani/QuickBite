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
import Loading from "./Custom_Components/Loading";

function App(): React.FC {
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
          element={isAuthUser ? <Loading /> : <Signup />}
        />

        <Route
          path="/sign-in"
          element={isAuthUser ? <Loading /> : <Signin />}
        />

        <Route
          path="*"
          element={isAuthUser ? <Loading /> : <Navigate to="/sign-up" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
