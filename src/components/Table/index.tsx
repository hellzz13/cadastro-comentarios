import { useContext, useState } from "react";
import { PostProps } from "../../types/Post";
// import InfoContext from "../../context/InfoContext";
import { useCustomModal } from "../../hooks/useCustomModal";

import api from "../../services/fakerApi";
import "./styles.css";
import { ActionModal } from "../ActionModal";
import EmptyList from "../EmptyList";
import { Link } from "react-router-dom";
import InfoContext from "../../context/InfoContext";

type TableProps = {
  list: PostProps[];
};

export default function Table({ list }: TableProps) {
  const modal = useCustomModal();
  const [itemId, setItemId] = useState<number | string>("");
  const { reloadData, setReloadData } = useContext(InfoContext);

  async function removePost(id: string | number | undefined) {
    await api.delete("/posts/remove", { post_id: id });
    setReloadData(!reloadData);
  }

  return (
    <body className="flex items-center justify-center">
      <div className="container">
        <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead className="text-white">
            {list &&
              list.map((item) => (
                <tr className="bg-secondary flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Título</th>
                  <th className="p-3 text-left">Conteúdo</th>

                  <th className="p-3 text-left w-[110px]">Ações</th>
                </tr>
              ))}
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {list.length > 0 ? (
              list.map((item) => (
                <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 bg-white">
                  <td className="border-grey-light border hover:bg-gray-100 p-3 w-full md:w-1/4">
                    <Link to={`post/${item.id}`}>
                      <div className="w-full ">{item.id}</div>
                    </Link>
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate w-full md:w-1/4">
                    <Link to={`post/${item.id}`}>
                      <div className="w-full ">{item.title}</div>
                    </Link>
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate max-w-sm lg:max-w-md w-full md:w-1/4">
                    <Link to={`post/${item.id}`}>
                      <div className="w-full ">{item.content}</div>
                    </Link>
                  </td>

                  <td
                    className="border-grey-light border hover:bg-gray-100 p-3 text-primary w-full md:w-1/4 hover:text-red-600 hover:font-medium cursor-pointer"
                    onClick={() => {
                      modal.setCustomModal({
                        status: true,
                        icon: "alert",
                        title: "Excluir!",
                        text: "Você tem certeza que deseja excluir esse post",
                        cancelButton: "Cancelar",
                        confirmButton: "",
                      });
                      setItemId(item.id);
                    }}
                  >
                    Delete
                  </td>
                </tr>
              ))
            ) : (
              <EmptyList />
            )}
          </tbody>
        </table>
      </div>
      <ActionModal
        type={modal.customModal.icon}
        title={modal.customModal.title}
        description={modal.customModal.text}
        isOpen={modal.customModal.status}
        setIsOpen={modal.handleCustomModalClose}
        action={removePost}
        itemId={itemId}
      />
    </body>
  );
}
