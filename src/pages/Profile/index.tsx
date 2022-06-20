import { useContext } from "react";
import { Context } from "../../context/AuthContext";
import avatar from "../../assets/avatar.png";

export default function Profile() {
  const { user } = useContext(Context);

  return (
    <div className="flex flex-col bg-white justify-center p-6 shadow-md rounded-xl sm:px-12  mx-4 md:mx-auto max-w-md md:max-w-2xl ">
      <img
        src={avatar}
        alt="Avatar usuário"
        className="w-32 h-32 mx-auto rounded-full aspect-square"
      />
      <div className="space-y-4 text-center divide-y divide-gray-700">
        <div className="my-2 space-y-1">
          <h2 className="text-xl font-semibold sm:text-2xl">{user?.name}</h2>
          <p className="px-5 text-xs sm:text-base ">Usuário</p>
        </div>
      </div>
    </div>
  );
}
