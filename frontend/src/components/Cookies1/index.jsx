import React from "react";

const Cookies = ({ children, details, title }) => {
  return (
    <>
      <div className="container">
        <div
          className={`flex flex-wrap items-center justify-between rounded-lg border border-[#f4f7ff] bg-[#e7e7e] py-8 px-6 xs:px-10 md:px-8 lg:px-10`}
        >
          <div className="w-full md:w-7/12 lg:w-2/3">
            <div className="mb-6 md:mb-0">
              <h4 className="mb-1 text-xl font-bold text-black xs:text-2xl md:text-xl lg:text-2xl">
                {title}
              </h4>
              <p className="text-base font-medium text-body-color">{details}</p>
            </div>
          </div>
          <div className="w-full md:w-5/12 lg:w-1/3">
            <div className="flex items-center space-x-3 md:justify-end">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cookies;
