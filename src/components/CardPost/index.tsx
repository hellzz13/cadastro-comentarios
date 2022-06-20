import { useCustomModal } from "../../hooks/useCustomModal";
import { CommentsProps } from "../../types/Comment";
import { ActionModal } from "../ActionModal";
import api from "../../services/fakerApi";
import { useContext, useState } from "react";
import InfoContext from "../../context/InfoContext";

type CardPostProps = {
  postId?: string | number;
  title?: string;
  content?: string;
  comments?: CommentsProps[];
};

export default function CardPost({
  title,
  content,
  comments,
  postId,
}: CardPostProps) {
  const modal = useCustomModal();
  const [itemId, setItemId] = useState<number | string>("");

  const { reloadData, setReloadData } = useContext(InfoContext);

  async function removeComment(
    commentId: number | string | undefined,
    postId: string | number | undefined
  ) {
    await api.delete("/comments/remove", {
      post_id: postId,
      comment_id: commentId,
    });

    setReloadData(!reloadData);
  }

  return (
    <>
      <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto max-w-md md:max-w-2xl ">
        <div className="flex items-start px-4 py-6">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                {title}
              </h2>
            </div>

            <p className="mt-3 text-gray-700 text-sm">{content}</p>
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
        comments.map((item) => (
          <div className="flex bg-white shadow-lg rounded-md mx-4 md:mx-auto max-w-md md:max-w-2xl justify-between p-3">
            <div>
              <small>Comentário:</small>
              <p className="text-grey-darkest leading-normal text-lg">
                {item.content}
              </p>
            </div>
            <div>
              <button className="ml-2 mt-1 mb-auto text-blue hover:text-blue-dark text-sm text-blue-600 cursor-pointer">
                Editar
              </button>
              <button
                onClick={() => {
                  modal.setCustomModal({
                    status: true,
                    icon: "alert",
                    title: "Excluir!",
                    text: "Você tem certeza que deseja excluir esse comentário",
                    cancelButton: "Cancelar",
                    confirmButton: "",
                  });
                  setItemId(item.id);
                }}
                className="ml-2 mt-1 mb-auto text-blue hover:text-blue-dark text-sm text-red-600 cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}

      <ActionModal
        type={modal.customModal.icon}
        title={modal.customModal.title}
        description={modal.customModal.text}
        isOpen={modal.customModal.status}
        setIsOpen={modal.handleCustomModalClose}
        action={removeComment}
        postId={postId}
        itemId={itemId}
      />
    </>
  );
}
