import { useQuery } from "react-query";
import "./index.css";
import Signup from "./pages/Signup";
import toast from "react-hot-toast";
function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await fetch("/api/getMe");
      const data = await res.json();
      if ("error" in data) {
        toast.error(data.error);
        return;
      }
      return data;
    },
  });

  const 

  return (
    <div className="h-full">
      <Signup />
    </div>
  );
}

export default App;
