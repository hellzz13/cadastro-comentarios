import { useContext, useEffect, useState } from "react";
import LoadingTable from "../../components/LoadingTable";
import Table from "../../components/Table";
import InfoContext from "../../context/InfoContext";
import api from "../../services/fakerApi";
import { PostProps } from "../../types/Post";

export default function Post() {
  const [postList, setPostList] = useState<PostProps[]>();
  const { reloadData } = useContext(InfoContext);

  useEffect(() => {
    async function getPostList() {
      const { data } = await api.get("/posts", {});
      await setPostList(data);
    }

    getPostList();
  }, [reloadData]);

  return (
    <div>
      <h1 className="font-bold">Lista de Posts</h1>{" "}
      <small>Clique no post para visualizar</small>
      {postList ? <Table list={postList} /> : <LoadingTable />}
    </div>
  );
}
