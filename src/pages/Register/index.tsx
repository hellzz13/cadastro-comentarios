import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Context } from "../../context/AuthContext";
import api from "../../services/fakerApi";
import history from "../../services/history";
import PrimaryButton from "../../components/Button/PrimaryButton";
import SecondaryButton from "../../components/Button/SecondaryButton";
import { AlertModal } from "../../components/AlertModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState<boolean>(false);

  const modal = useCustomModal();

  interface IFormInputs {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
  }

  const schema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    username: yup.string().required("Usuário obrigatório"),
    password: yup.string().required("Senha obrigatória"),
    confirmPassword: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  async function handleRegister(data: IFormInputs) {
    setIsLoading(true);
    try {
      await api.post("/register", {
        name: data.name,
        username: data.username,
        password: data.password,
      });
    } catch (e: any) {
      modal.setCustomModal({
        status: true,
        icon: "error",
        title: "Falha ao registrar!",
        text: e.message,
        cancelButton: "",
        confirmButton: "",
      });
    }

    setIsLoading(false);
    modal.setCustomModal({
      status: true,
      icon: "success",
      title: "Cadastro realizado com sucesso!",
      text: "Agora você pode acessar a aplicação",
      cancelButton: "",
      confirmButton: "Ok",
    });
  }

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
                Registro
              </h2>
            </div>
            <form
              className="space-y-6"
              action="#"
              method="POST"
              id="registerForm"
              onSubmit={handleSubmit(handleRegister)}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome
                </label>
                <div className="mt-1">
                  <input
                    {...register("name")}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {errors.name && (
                  <span className="text-red-600">{errors.name.message}</span>
                )}
              </div>

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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {errors.username && (
                  <span className="text-red-600">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <div className="mt-1 relative">
                  <div
                    className="absolute z-10 right-4 top-2 cursor-pointer"
                    onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                  >
                    {isVisiblePassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </div>
                  <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type={isVisiblePassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {errors.password && (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirme sua senha
                </label>
                <div className="mt-1 relative">
                  <div
                    className="absolute z-10 right-4 top-2 cursor-pointer"
                    onClick={() =>
                      setIsVisibleConfirmPassword(!isVisibleConfirmPassword)
                    }
                  >
                    {isVisibleConfirmPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </div>
                  <input
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={isVisibleConfirmPassword ? "text" : "password"}
                    autoComplete="current-confirmPassword"
                    className="appearance-none  block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-600">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </form>
            <div className="flex flex-col gap-3 mt-4">
              <PrimaryButton
                title="Registrar"
                form="registerForm"
                isLoading={isLoading}
              />
              <SecondaryButton
                title="Voltar"
                onClick={() => history.goBack()}
              />
            </div>
            {/* space */}
            <div className="mt-6"></div>
          </div>
        </div>
      </div>

      <AlertModal
        type={modal.customModal.icon}
        title={modal.customModal.title}
        description={modal.customModal.text}
        isOpen={modal.customModal.status}
        setIsOpen={modal.handleCustomModalClose}
        confirmButton={modal.customModal.confirmButton}
        path="/"
      />
    </>
  );
}
