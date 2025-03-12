"use client";
import { useFormStatus } from "react-dom";

const UpdateButton = ({
  children,
  pendingLabel,
}: {
  children: React.ReactNode;
  pendingLabel: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={`px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 ${
        pending ? "bg-primary-600" : "bg-accent-500 "
      }`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
};

export default UpdateButton;
