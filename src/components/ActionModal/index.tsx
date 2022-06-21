import { ReactNode } from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

import SecondaryButton from "../Button/SecondaryButton";
import PrimaryButton from "../Button/PrimaryButton";

type ActionModalProps = {
  type: "success" | "alert" | "error" | "none";
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: ReactNode;
  redirectModal?: boolean;
  link?: string;

  setIsQuickViewOpen?: (isOpen: boolean) => void;

  action: (
    postId: string | number | undefined,
    commentId: number | string | undefined
  ) => Promise<void>;
  itemId?: number | string;
  postId?: number | string;
};

export const ActionModal = ({
  type,
  title,
  description,
  isOpen,
  setIsOpen,
  action,
  itemId,
  postId,
}: ActionModalProps) => {
  const completeButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        initialFocus={completeButtonRef}
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={() => {}}
      >
        <div
          className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
          style={{ fontSize: 0 }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden md:inline-block md:align-middle md:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-7 md:my-8 md:align-middle lg:max-w-2xl">
              <div className="w-full relative bg-white px-4 pt-14 pb-8 space-y-6 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                  type="button"
                  className="absolute z-50 top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  ref={completeButtonRef}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* content */}
                <div className=" w-full text-center text-secondary space-y-5">
                  <div className="text-2xl">{title}</div>
                  <p>{description}</p>

                  {/* Actions button */}
                  <div className="flex gap-3 p-5">
                    <SecondaryButton
                      title={"cancelar"}
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    />
                    <PrimaryButton
                      title={"Confirmar"}
                      onClick={() => {
                        action(itemId, postId);
                        setIsOpen(false);
                      }}
                    />
                  </div>
                </div>
                {/* content end */}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
