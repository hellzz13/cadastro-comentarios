import { CommentsProps } from "../../types/Comment";
import api from "../../services/fakerApi";
import { useContext, useState } from "react";
import InfoContext from "../../context/InfoContext";
import PrimaryButton from "../Button/PrimaryButton";
import CommentCard from "../CommentCard";

type CardPostProps = {
  postId?: string | number;
  title: string;
  content: string;
  comments?: CommentsProps[];
};

export default function CardPost({
  title,
  content,
  comments,
  postId,
}: CardPostProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPostEditable, setIsPostEditable] = useState<boolean>(false);
  const [editableTitle, setEditableTitle] = useState<string>(title);
  const [editableContent, setEditableContent] = useState<string>(content);

  const { reloadData, setReloadData } = useContext(InfoContext);

  async function handleUpdatePost(
    postId: string | number | undefined,
    title: string,
    content: string
  ) {
    setIsLoading(true);
    await api.put("/posts/update", {
      post_id: postId,
      post: { title: title, content: content },
    });

    await setIsLoading(false);
    setReloadData(!reloadData);
    setIsPostEditable(false);
  }

  return (
    <>
      <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto max-w-md md:max-w-2xl ">
        <div className="flex items-start px-4 py-6 w-full">
          <div className="w-full">
            <div className="flex items-center justify-between">
              {isPostEditable ? (
                <div className="relative">
                  <input
                    type="text"
                    id="contact-form-name"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Título"
                    value={editableTitle}
                    onChange={(e) => setEditableTitle(e.target.value)}
                    defaultValue={title}
                  />
                  {!!!editableTitle.length && (
                    <span className="text-red-600">Digite algum conteúdo</span>
                  )}
                </div>
              ) : (
                <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                  {title}
                </h2>
              )}
              <button
                onClick={() => setIsPostEditable(!isPostEditable)}
                className="ml-2 mt-1 mb-auto text-blue hover:text-blue-dark text-sm text-blue-600 cursor-pointer"
              >
                Editar
              </button>
            </div>

            {isPostEditable ? (
              <div className="col-span-2">
                <label className="text-gray-700" htmlFor="name"></label>
                <textarea
                  className="flex-1 mt-3 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  id="content"
                  placeholder="Digite aqui seu post"
                  name="content"
                  rows={2}
                  cols={40}
                  value={editableContent}
                  defaultValue={content}
                  onChange={(e) => setEditableContent(e.target.value)}
                ></textarea>
                {!!!editableContent.length && (
                  <span className="text-red-600">Digite algum conteúdo</span>
                )}
                <PrimaryButton
                  disabled={
                    !!!editableContent.length || !!!editableTitle.length
                      ? true
                      : false
                  }
                  title="Salvar"
                  onClick={() =>
                    handleUpdatePost(postId, editableTitle, editableContent)
                  }
                  isLoading={isLoading}
                />
              </div>
            ) : (
              <div>
                <p className="mt-3 text-gray-700 text-sm">{content}</p>
              </div>
            )}
            <div className="mt-4 flex items-center">
              <div className="flex mr-2 text-gray-700 text-sm cursor-pointer">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-1"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
                <span>{comments?.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {comments &&
        comments.map((item) => <CommentCard comment={item} postId={postId} />)}
    </>
  );
}
