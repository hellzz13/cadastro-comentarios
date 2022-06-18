import PostImg from "../../assets/logo.png";

import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Context } from "../../context/AuthContext";
import api from "../../services/fakerApi";
import history from "../../services/history";
import { Link } from "react-router-dom";

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
    console.log(data);
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
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                form="loginForm"
              >
                Entrar
              </button>
              <Link to="/registrar">
                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Registrar
                </button>
              </Link>
            </div>
            {/* space */}
            <div className="mt-6"></div>
          </div>
        </div>
      </div>
    </>
  );
}
