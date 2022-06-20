import api from "../../services/fakerApi";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PrimaryButton from "../Button/PrimaryButton";

type CommentBoxProps = {
  postId?: number;
};

export default function CommentBox({ postId }: CommentBoxProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  interface IFormInputs {
    content: string;
  }

  const schema = yup.object().shape({
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

  async function handleCreateComment(data: IFormInputs) {
    setIsLoading(true);
    await api.post("/comments/create", {
      post_id: postId,
      comment: { content: data.content },
    });
    await setIsLoading(false);
  }

  return (
    <div className="bg-white shadow-lg rounded-lg mx-4 md:mx-auto max-w-md md:max-w-2xl">
      <form
        id="commentForm"
        className="w-full p-4"
        onSubmit={handleSubmit(handleCreateComment)}
      >
        <div className="mb-2">
          <label htmlFor="content" className="text-lg text-gray-600">
            Adicionar comentário
          </label>
          <textarea
            {...register("content")}
            className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            name="content"
            placeholder=""
          ></textarea>
          {errors.content && (
            <span className="text-red-600">{errors.content.message}</span>
          )}
        </div>
        <PrimaryButton
          title="Comentar"
          isLoading={isLoading}
          form="commentForm"
        />
      </form>
    </div>
  );
}
