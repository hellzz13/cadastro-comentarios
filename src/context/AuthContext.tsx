import { createContext, useEffect, useState } from "react";
// import { AlertModal } from "../components/AlertModal";
// import { AlertModal } from "../components/AlertModal";
// import { useCustomModal } from "../hooks/useCustomModal";
// import api from "../services/api";
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

// removido react FC verificar
const AuthProvider = ({ children }: any) => {
    const [authenticated, setAuthenticated] = useState(
        DEFAULT_VALUE.authenticated
    );
    const [loading, setLoading] = useState(DEFAULT_VALUE.loading);
    const [user, setUser] = useState(DEFAULT_VALUE.user);
    const [isActiveLogin, setIsActiveLogin] = useState(
        DEFAULT_VALUE.isActiveLogin
    );

    // const modal = useCustomModal();

    useEffect(() => {
        const token = localStorage.getItem("BV@token");
        const user = localStorage.getItem("BV@user");

        // colocar dentro do else
        // setLoading(false);

        if (token && user) {
            // api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
            //     token
            // )}`;

            setUser(JSON.parse(user));
            setAuthenticated(true);
            setLoading(false);
        } else {
            localStorage.removeItem("@token");
            localStorage.removeItem("@user");
        }
    }, []);

    async function handleLogin({ username, password }: LoginData) {
        await api.post("/login", {
            username: username,
            password: password,
        });
        try {
            // const dataLogin = {
            //     username: "teste",
            //     password: "teste",
            // };
            // await api.post("/login", {
            //     username: username,
            //     password: password,
            // });
            // .catch((err) => {
            //     modal.setCustomModal({
            //         status: true,
            //         icon: "error",
            //         title: "Falha ao acessar!",
            //         text: err.response.data.error,
            //         cancelButton: "",
            //         confirmButton: "",
            //     });
            //     throw err.response.status;
            // });
            // localStorage.setItem("AUTH@token", JSON.stringify(response));
            // localStorage.setItem("@user", JSON.stringify(user));
            // api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            history.push("/");
            setUser(user);
            setAuthenticated(true);
        } catch {}
    }

    function handleLogOut() {
        localStorage.removeItem("@token");
        localStorage.removeItem("@user");

        // api.defaults.headers.common["Authorization"] = "";

        // localStorage.removeItem("ESSENCIAL@terms");
        // // window.location.replace("/");
        setAuthenticated(false);
        history.push("/"); //verify
    }

    // verify loading

    // if (loading) {
    //     return <h1>Loading...</h1>;
    // }

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

            {/* <AlertModal
                type={modal.customModal.icon}
                title={modal.customModal.title}
                description={modal.customModal.text}
                isOpen={modal.customModal.status}
                setIsOpen={modal.handleCustomModalClose}
            /> */}
        </Context.Provider>
    );
};

export { Context, AuthProvider };
