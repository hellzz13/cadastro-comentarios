import { createContext, useEffect, useState } from "react";
import { AlertModal } from "../components/AlertModal";
import { useCustomModal } from "../hooks/useCustomModal";
import api from "../services/fakerApi";
import history from "../services/history";
import { UserProps } from "../types/User";

type LoginData = {
  username: string;
  password: string;
};

type AuthProps = {
  authenticated: boolean;
  handleLogin: (data: LoginData) => Promise<void>;
  loading: boolean;
  handleLogOut: () => void;
  user: UserProps | null;
  isActiveLogin: boolean;
  setIsActiveLogin: (state: boolean) => void;
};

const DEFAULT_VALUE = {
  authenticated: false,
  handleLogin: async () => {},
  loading: true,
  handleLogOut: () => {},
  user: null,
  isActiveLogin: false,
  setIsActiveLogin: () => {},
};

const Context = createContext<AuthProps>(DEFAULT_VALUE);

const AuthProvider = ({ children }: any) => {
  const [authenticated, setAuthenticated] = useState(
    DEFAULT_VALUE.authenticated
  );
  const [loading, setLoading] = useState(DEFAULT_VALUE.loading);
  const [user, setUser] = useState(DEFAULT_VALUE.user);
  const [isActiveLogin, setIsActiveLogin] = useState(
    DEFAULT_VALUE.isActiveLogin
  );

  const modal = useCustomModal();

  async function getUserData() {
    const { data } = await api.get("/me", {});
    setUser(data);
  }

  useEffect(() => {
    const token = localStorage.getItem("auth");

    if (token) {
      setAuthenticated(true);
      setLoading(false);
      getUserData();
    } else {
      handleLogOut();
    }
  }, []);

  async function handleLogin({ username, password }: LoginData) {
    await api
      .post("/login", {
        username: username,
        password: password,
      })
      .catch((e) => {
        modal.setCustomModal({
          status: true,
          icon: "error",
          title: "Falha ao acessar!",
          text: e.message,
          cancelButton: "",
          confirmButton: "",
        });
      });

    history.push("/");
    const { data } = await api.get("/me", {});
    setUser(data);
    setAuthenticated(true);
  }

  async function handleLogOut() {
    await api.post("/logout", {});
    await setAuthenticated(false);
  }

  return (
    <Context.Provider
      value={{
        authenticated,
        handleLogin,
        loading,
        handleLogOut,
        user,
        isActiveLogin,
        setIsActiveLogin,
      }}
    >
      {children}

      <AlertModal
        type={modal.customModal.icon}
        title={modal.customModal.title}
        description={modal.customModal.text}
        isOpen={modal.customModal.status}
        setIsOpen={modal.handleCustomModalClose}
      />
    </Context.Provider>
  );
};

export { Context, AuthProvider };
