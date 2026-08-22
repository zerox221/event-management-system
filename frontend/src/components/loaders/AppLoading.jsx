import React from "react";
import { LoaderCircle } from "lucide-react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex min-h-75 w-full flex-col items-center justify-center gap-3">
      <LoaderCircle className="h-8 w-8 animate-spin text-indigo-600" />

      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );
};

export default Loader;