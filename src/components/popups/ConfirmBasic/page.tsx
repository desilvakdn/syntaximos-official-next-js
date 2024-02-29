import React from "react";

function ConfirmBasic({
  header,
  body,
  close,
  confirm,
}: {
  header: string;
  body: string;
  close: () => void;
  confirm: () => void;
}) {
  function handleconfirm() {
    confirm();
    close();
  }
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 bg-synblack z-10 flex justify-center items-center">
      <div className="SlideIn0 p-4 min-w-[500px] min-h-[200px] bg-synwhite rounded text-synblack flex flex-col justify-center items-center">
        <h2>{header}</h2>
        <p className="max-w-[480px] text-center">{body}</p>
        <div className="flex flex-row gap-2 w-full justify-center items-center">
          <button onClick={close} className="bg-synblack text-synwhite mt-4">
            Cancel
          </button>
          <button
            onClick={handleconfirm}
            className="bg-synblack text-synwhite mt-4"
          >
            Confirm{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBasic;
