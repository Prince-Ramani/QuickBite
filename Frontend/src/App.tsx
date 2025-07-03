import "./index.css";

import { useQuery } from "react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Signup from "./pages/Signup";
import Loading from "./Custom_Components/Loading";
import { useAuthUser } from "./Context/use-auth-user";
import Signin from "./pages/Signin";
function App() {
  const { setAuthUser } = useAuthUser();
  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await fetch("/api/getMe");
      const data = await res.json();

      if ("_id" in data) setAuthUser(data);
      return data;
    },
    retry: false,
  });

  const isAuthUser = data && !data.error;

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
