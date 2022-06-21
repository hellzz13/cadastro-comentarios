import { useContext, useState } from "react";
import InfoContext from "../../context/InfoContext";
import { useCustomModal } from "../../hooks/useCustomModal";
import { CommentsProps } from "../../types/Comment";
import { ActionModal } from "../ActionModal";
import PrimaryButton from "../Button/PrimaryButton";
import api from "../../services/fakerApi";

type CommentCardProps = {
  comment: CommentsProps;

  postId: string | number | undefined;
};

export default function CommentCard({ comment, postId }: CommentCardProps) {
  const modal = useCustomModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [itemId, setItemId] = useState<number | string>("");
  const [editableComment, setEditableComment] = useState<string>(
    comment.content
  );

  const [isCommentEditable, setIsCommentEditable] = useState<boolean>(false);

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

  async function handleUpdateComment(
    postId: string | number | undefined,
    commentId: number,
    content: string | undefined
  ) {
    setIsLoading(true);
    await api.put("/comments/update", {
      post_id: postId,
      comment_id: commentId,
      comment: { content: editableComment },
    });

    await setIsLoading(false);
    setReloadData(!reloadData);
    setIsCommentEditable(false);
  }

  return (
    <>
      <div className="flex bg-white shadow-lg rounded-md mx-4 md:mx-auto max-w-md md:max-w-2xl justify-between p-3">
        <div>
          {isCommentEditable ? (
            <div className="mb-2">
              <label htmlFor="content" className="text-lg text-gray-600">
                <small>Editar comentário</small>
              </label>
              <textarea
                className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                name="content"
                placeholder=""
                value={editableComment}
                defaultValue={comment.content}
                onChange={(e) => setEditableComment(e.target.value)}
                rows={2}
                cols={35}
              ></textarea>
              {!!!editableComment.length && (
                <span className="text-red-600">Digite algum conteúdo</span>
              )}

              <PrimaryButton
                title="Salvar"
                onClick={() => {
                  handleUpdateComment(postId, comment.id, editableComment);
                }}
                isLoading={isLoading}
                disabled={!!!editableComment.length ? true : false}
              />
            </div>
          ) : (
            <>
              <small>Comentário:</small>
              <p className="text-grey-darkest leading-normal text-lg">
                {comment.content}
              </p>
            </>
          )}
        </div>
        <div>
          <button
            onClick={() => setIsCommentEditable(!isCommentEditable)}
            className="ml-2 mt-1 mb-auto text-blue hover:text-blue-dark text-sm text-blue-600 cursor-pointer"
          >
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
              setItemId(comment.id);
            }}
            className="ml-2 mt-1 mb-auto text-blue hover:text-blue-dark text-sm text-red-600 cursor-pointer"
          >
            Excluir
          </button>
        </div>
      </div>
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
