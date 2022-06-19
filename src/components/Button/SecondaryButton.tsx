import { ButtonHTMLAttributes } from "react";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export default function SecondaryButton({
  title,
  ...rest
}: SecondaryButtonProps) {
  return (
    <button
      className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-primary border-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      {...rest}
    >
      {title}
    </button>
  );
}
