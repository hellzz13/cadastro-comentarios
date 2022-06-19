import { FaSpinner } from "react-icons/fa";

export default function LoadingTable() {
  return (
    <div className="container flex flex-col items-center justify-center gap-3 text-secondary h-96">
      <FaSpinner className="animate-spin mx-auto" size={35} />
      <p>Carregando...</p>
    </div>
  );
}
