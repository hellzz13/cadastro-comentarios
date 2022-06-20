import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardPost from "../../components/CardPost";
import CommentBox from "../../components/CommentBox";
import InfoContext from "../../context/InfoContext";
import api from "../../services/fakerApi";
import { PostProps } from "../../types/Post";

export default function PostDetails() {
  const [post, setPost] = useState<PostProps>();

  let { id }: { id: string } = useParams();

  const { reloadData } = useContext(InfoContext);

  useEffect(() => {
    async function getPost() {
      const { data } = await api.get("/posts/view", { post_id: parseInt(id) });
      await setPost(data);
      console.log(post);
    }

    getPost();
  }, [id, reloadData]);

  return (
    <div>
      <CardPost
        postId={parseInt(id)}
        title={post?.title}
        content={post?.content}
        comments={post?.comments}
      />
      <CommentBox postId={parseInt(id)} />
    </div>
  );
}
