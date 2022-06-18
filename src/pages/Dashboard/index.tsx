import { useContext, useEffect, useState } from "react";
import CreatePostBox from "../../components/CreatePostBox";
import Table from "../../components/Table";
import { Context } from "../../context/AuthContext";

export default function Dashboard() {
  const { handleLogOut, user } = useContext(Context);

  //   async function handleCreatePost() {
  //     await api.post("/posts/create", { title: "teste", content: "teste" });
  //   }
  //   handleCreatePost();

  return (
    <div>
      <h1>Ola, {user?.name}</h1>
      <CreatePostBox />

      {/* <button
        onClick={() => handleLogOut()}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sair
      </button> */}
    </div>
  );
}
