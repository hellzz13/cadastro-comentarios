import { useContext } from "react";
import { Context } from "../../context/AuthContext";

export default function Dashboard() {
  const { handleLogOut } = useContext(Context);
  return (
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={() => handleLogOut()}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sair
      </button>
    </div>
  );
}
