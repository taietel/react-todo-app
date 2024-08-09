import { Dialog } from '@headlessui/react';
import Modal from '../Modal';

export interface DeleteAlertProps {
  show: boolean;
  onClose: () => void;
  onConfirmAction: () => void;
  title: string;
  description: string;
}

export default function DeleteAlert({
  show,
  onClose,
  onConfirmAction,
  title,
  description,
}: DeleteAlertProps) {
  const handleConfirmAction = () => {
    onConfirmAction();
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <svg
            className="h-6 w-6 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-slate-900 dark:text-slate-300"
          >
            {title}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={handleConfirmAction}
        >
          Delete
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
