import { useContext, useEffect, useState } from "react";
import CardPost from "../../components/CardPost";
import CommentBox from "../../components/CommentBox";
import CreatePostBox from "../../components/CreatePostBox";

import { Context } from "../../context/AuthContext";

export default function Dashboard() {
  const { handleLogOut, user } = useContext(Context);

  //   async function handleCreatePost() {
  //     await api.post("/posts/create", { title: "teste", content: "teste" });
  //   }
  //   handleCreatePost();

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-6">
          <CreatePostBox />
        </div>
        <div className="col-span-12 mt-10 lg:mt-0 lg:col-span-6">
          <CardPost />
          <CommentBox />
        </div>
      </div>
    </div>
  );
}
