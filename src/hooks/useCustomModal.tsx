import { useState } from "react";
import { CustomModalType } from "../types/CustomModal";

export function useCustomModal() {
  const [customModal, setCustomModal] = useState<CustomModalType>({
    status: false,
    icon: "none",
    title: "",
    text: "",
    cancelButton: "", //caso haja botão de cancelar
    confirmButton: "", //caso haja botão de confirmação
  });

  const handleCustomModalClose = () => {
    setCustomModal({
      status: false,
      icon: "none",
      title: "",
      text: "",
      cancelButton: "",
      confirmButton: "",
    });
  };

  return {
    customModal,
    setCustomModal,
    handleCustomModalClose,
  };
}
