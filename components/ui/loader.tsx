import React from "react";

export const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center p-1">
      <div className="size-5 animate-spin rounded-full border-b-2 border-t-2 border-white" />
    </div>
  );
};
