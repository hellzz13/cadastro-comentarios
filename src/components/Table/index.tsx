import { useContext, useState } from "react";
import { PostProps } from "../../types/Post";
// import InfoContext from "../../context/InfoContext";
// import { useCustomModal } from "../../hooks/useCustomModal";
// import api from "../../services/api";
import { UserProps } from "../../types/User";
// import { ActionModal } from "../ActionModal";
import "./styles.css";

type TableProps = {
  list: PostProps[];
};

export default function Table({ list }: TableProps) {
  // const modal = useCustomModal();
  const [itemId, setItemId] = useState<string>("");
  // const { reloadData, setReloadData } = useContext(InfoContext);

  // async function removeUser(id: string) {
  //     await api.delete(`users/delete/${id}`);
  //     // await setIsOpen(false);
  //     setReloadData(!reloadData);
  // }

  return (
    <body className="flex items-center justify-center">
      <div className="container">
        <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead className="text-white">
            {list &&
              list.map((item) => (
                <tr className="bg-indigo-700 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Título</th>
                  <th className="p-3 text-left">Conteúdo</th>

                  <th className="p-3 text-left w-[110px]">Ações</th>
                </tr>
              ))}
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {list &&
              list.map((item) => (
                <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 bg-white">
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    {item.id}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {item.title}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {item.content}
                  </td>

                  <td
                    className="border-grey-light border hover:bg-gray-100 p-3 text-mainDarkRed hover:text-red-600 hover:font-medium cursor-pointer"
                    // onClick={() => {
                    //     modal.setCustomModal({
                    //         status: true,
                    //         icon: "alert",
                    //         title: "Excluir!",
                    //         text: "Você tem certeza que deseja excluir esse usuário?",
                    //         cancelButton: "Cancelar",
                    //         confirmButton: "",
                    //     });
                    //     setItemId(item.id);
                    // }}
                  >
                    Delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* <ActionModal
                type={modal.customModal.icon}
                title={modal.customModal.title}
                description={modal.customModal.text}
                isOpen={modal.customModal.status}
                setIsOpen={modal.handleCustomModalClose}
                action={removeUser}
                itemId={itemId}
            /> */}
    </body>
  );
}
