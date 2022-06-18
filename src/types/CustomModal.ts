export type CustomModalType = {
    status: boolean;
    icon: "success" | "alert" | "error" | "none";
    title: string;
    text: string;
    cancelButton: string;
    confirmButton: string;
};
