import PostImg from "../../assets/logo.png";

import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Context } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/Button/PrimaryButton";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  interface IFormInputs {
    username: string;
    password: string;
  }

  const schema = yup.object().shape({
    username: yup.string().required("Usuário obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const { handleLogin } = useContext(Context);

  async function login(data: IFormInputs) {
    setIsLoading(true);
    await handleLogin(data);
    await setIsLoading(false);
  }

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="mx-auto h-32 w-auto"
                src={PostImg}
                alt="Comentários"
              />
              <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
                Social Post
              </h2>
            </div>
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit(login)}
              id="loginForm"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Usuário
                </label>
                <div className="mt-1">
                  <input
                    {...register("username")}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <div className="mt-1">
                  <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </form>
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/registrar">
                <div className="flex justify-end text-primary hover:text-secondary mx-3">
                  Registrar
                </div>
              </Link>
              <PrimaryButton
                title="Entrar"
                form="loginForm"
                isLoading={isLoading}
              />
            </div>
            {/* space */}
            <div className="mt-6"></div>
          </div>
        </div>
      </div>
    </>
  );
}
