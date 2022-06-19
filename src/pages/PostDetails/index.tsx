import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardPost from "../../components/CardPost";
import CommentBox from "../../components/CommentBox";
import api from "../../services/fakerApi";
import { PostProps } from "../../types/Post";

export default function PostDetails() {
  const [post, setPost] = useState<PostProps>();

  let { id }: { id: string } = useParams();

  useEffect(() => {
    async function getPost() {
      const { data } = await api.get("/posts/view", { post_id: parseInt(id) });
      await setPost(data);
      console.log(post);
    }

    getPost();
  }, [id]);

  return (
    <div>
      <CardPost title={post?.title} content={post?.content} />
      <CommentBox />
    </div>
  );
}
