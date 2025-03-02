import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12">
      {children}
    </div>
  );
};
