import { AuthProvider } from "./context/AuthContext";
import { InfoContextProvider } from "./context/InfoContext";
import Login from "./pages/Login";
import Routes from "./routes";

export default function App() {
  return (
    <AuthProvider>
      <InfoContextProvider>
        <Routes />
      </InfoContextProvider>
    </AuthProvider>
  );
}
