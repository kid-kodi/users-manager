import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ModalBody = ({ modalOpen, setModalOpen, modalBody, modalTitle }) => {
  return (
    <>
      {modalOpen && (
        <div className="fixed top-0 left-0 flex z-[9999] items-center justify-center w-full h-full min-h-screen px-4 py-5 bg-black bg-opacity-90">
          <div className="relative w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px]">
            <h3 className="pb-2 text-xl font-bold text-dark sm:text-2xl">
              {modalTitle}
            </h3>
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-0 right-0 w-10 h-10"
            >
              <XMarkIcon className="w-10 h-10" />
            </button>
            <p className="mb-10 text-base leading-relaxed text-body-color">
              {modalBody}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBody;
