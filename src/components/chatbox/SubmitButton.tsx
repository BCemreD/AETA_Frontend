import React from "react";

interface Props {
  onClick: () => void;
  label?: string;
}

const SubmitButton: React.FC<Props> = ({ onClick, label = "Gönder" }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {label}
    </button>
  );
};

export default SubmitButton;
