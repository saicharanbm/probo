import React from "react";

function InputForm({
  error,
  userRef,
  handleSubmit,
  text,
  inputType,
}: {
  error?: string;
  userRef: React.RefObject<HTMLInputElement>;
  handleSubmit: () => void;
  text: string;
  inputType: string;
}) {
  return (
    <form className="bg-[#F5F5F5] p-6 rounded-lg h-[350px] w-[400px] flex flex-col justify-evenly shadow-2xl">
      <label className="text-3xl" htmlFor="input">
        {text} :
      </label>
      <input
        id="input"
        type={inputType}
        ref={userRef}
        className="bg-white w-full px-4 py-2 rounded-lg border-2 border-gray-300"

        // onChange={(e) => setUserId(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-black text-white text-3xl px-4 py-2 rounded-lg align-middle w-full"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {text}
      </button>
    </form>
  );
}

export default InputForm;
