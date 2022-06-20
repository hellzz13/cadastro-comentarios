import api from "../../services/fakerApi";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import PrimaryButton from "../Button/PrimaryButton";
import { useCustomModal } from "../../hooks/useCustomModal";
import { AlertModal } from "../AlertModal";

export default function CreatePostBox() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const modal = useCustomModal();

  interface IFormInputs {
    title: string;
    content: string;
  }

  const schema = yup.object().shape({
    title: yup.string().required("Título obrigatório"),
    content: yup.string().required("Conteúdo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  async function handleCreatePost(data: IFormInputs) {
    setIsLoading(true);
    try {
      await api.post("/posts/create", {
        title: data.title,
        content: data.content,
      });
      modal.setCustomModal({
        status: true,
        icon: "success",
        title: "Post criado com sucesso",
        text: "Agora ele poderá ser visto na lista de posts",
        cancelButton: "",
        confirmButton: "Ok",
      });
    } catch {}
    await setIsLoading(false);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCreatePost)}
        className="flex w-full space-x-3"
        id="postForm"
      >
        <div className="w-full max-w-2xl px-5 py-10 m-auto bg-white rounded-lg shadow ">
          <div className="mb-6 text-3xl font-light text-center text-gray-800 ">
            Criando um post!
          </div>
          <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
            <div className="col-span-2">
              <div className=" relative ">
                <input
                  {...register("title")}
                  type="text"
                  id="contact-form-name"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Título"
                />
                {errors.title && (
                  <span className="text-red-600">{errors.title.message}</span>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label className="text-gray-700" htmlFor="name"></label>
              <textarea
                {...register("content")}
                className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                id="content"
                placeholder="Digite aqui seu post"
                name="content"
                rows={5}
                cols={40}
              ></textarea>

              {errors.content && (
                <span className="text-red-600">{errors.content.message}</span>
              )}
            </div>
            <div className="col-span-2 text-right">
              <PrimaryButton
                title="Enviar"
                form="postForm"
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </form>

      <AlertModal
        type={modal.customModal.icon}
        title={modal.customModal.title}
        description={modal.customModal.text}
        isOpen={modal.customModal.status}
        setIsOpen={modal.handleCustomModalClose}
        confirmButton={modal.customModal.confirmButton}
        path="posts"
      />
    </>
  );
}
