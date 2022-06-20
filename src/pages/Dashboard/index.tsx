import { useContext, useEffect, useState } from "react";
import CreatePostBox from "../../components/CreatePostBox";

import { Context } from "../../context/AuthContext";

export default function Dashboard() {
  const { handleLogOut, user } = useContext(Context);

  return (
    <div>
      <div className="flex justify-center">
        <CreatePostBox />
      </div>
    </div>
  );
}
