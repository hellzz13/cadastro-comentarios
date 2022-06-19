import api from "../../services/fakerApi";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";

export default function CreatePostBox() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    interface IFormInputs {
        title: string;
        content: string;
    }

    const schema = yup.object().shape({
        title: yup.string().required("Nome obrigatório"),
        content: yup.string().required("Conteudo obrigatório"),
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
        await api.post("/posts/create", {
            title: data.title,
            content: data.content,
        });
    }

    return (
        <form
            onSubmit={handleSubmit(handleCreatePost)}
            className="flex w-full max-w-sm space-x-3"
            id="postForm"
        >
            <div className="w-full max-w-2xl px-5 py-10 m-auto mt-10 bg-white rounded-lg shadow ">
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
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="Título"
                            />
                            {errors.title && (
                                <span className="text-red-600">
                                    {errors.title.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="col-span-2">
                        <label className="text-gray-700" htmlFor="name"></label>
                        <textarea
                            {...register("content")}
                            className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            id="content"
                            placeholder="Digite aqui seu post"
                            name="content"
                            rows={5}
                            cols={40}
                        ></textarea>

                        {errors.content && (
                            <span className="text-red-600">
                                {errors.content.message}
                            </span>
                        )}
                    </div>
                    <div className="col-span-2 text-right">
                        <button
                            type="submit"
                            form="postForm"
                            className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
