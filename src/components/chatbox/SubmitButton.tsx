import React from "react";

interface Props {
  onClick: () => void;
  label?: string;
}

export const SubmitButton: React.FC<Props> = ({ onClick, label = "Gönder" }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-[#034ea2] text-white rounded"
    >
      {label}
    </button>
  );
};

export default SubmitButton;
