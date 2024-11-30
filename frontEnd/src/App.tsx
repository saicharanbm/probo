import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <UserProvider>
        <Navbar />
        <Outlet />
      </UserProvider>
    </div>
  );
}

export default App;
