import { useEffect, useState } from "react";
import Table from "../../components/Table";
import api from "../../services/fakerApi";
import { PostProps } from "../../types/Post";

export default function Post() {
  const [postList, setPostList] = useState<PostProps[]>([]);

  useEffect(() => {
    async function getPostList() {
      const { data } = await api.get("/posts", {});
      await setPostList(data);
      console.log(postList);
    }

    getPostList();
  }, []);

  return (
    <div>
      <h1>Post</h1>
      {postList && <Table list={postList} />}
    </div>
  );
}
