import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrimaryButton from "../../components/Button/PrimaryButton";
import CardPost from "../../components/CardPost";
import CommentBox from "../../components/CommentBox";
import InfoContext from "../../context/InfoContext";
import api from "../../services/fakerApi";
import history from "../../services/history";
import { PostProps } from "../../types/Post";
import { MdChevronLeft } from "react-icons/md";
import EmptyList from "../../components/EmptyList";
import LoadingTable from "../../components/LoadingTable";

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
      <div className="mx-4 md:mx-auto max-w-md md:max-w-2xl">
        <div className="w-32 mb-5">
          <PrimaryButton onClick={() => history.goBack()}>
            <MdChevronLeft size={24} className="text-white" />
          </PrimaryButton>
        </div>
      </div>
      {post ? (
        <CardPost
          postId={parseInt(id)}
          title={post?.title}
          content={post?.content}
          comments={post?.comments}
        />
      ) : (
        <LoadingTable />
      )}

      <CommentBox postId={parseInt(id)} />
    </div>
  );
}
