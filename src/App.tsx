import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Routes from "./routes";

export default function App() {
    return (
    <AuthProvider>
        <Routes />
     </AuthProvider>
    );
}
