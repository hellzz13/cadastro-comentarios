import { createContext, useState } from "react";

type InfoProps = {
  reloadData: boolean;
  setReloadData: (state: boolean) => void;
};

const DEFAULT_VALUE = {
  reloadData: false,
  setReloadData: () => {},
};

const InfoContext = createContext<InfoProps>(DEFAULT_VALUE);

const InfoContextProvider = ({ children }: any) => {
  const [reloadData, setReloadData] = useState(DEFAULT_VALUE.reloadData);

  return (
    <InfoContext.Provider
      value={{
        reloadData,
        setReloadData,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export { InfoContextProvider };
export default InfoContext;
