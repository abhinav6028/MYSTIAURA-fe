import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: LayoutProps) => {
  return (
    <div className="m-[2rem]">
      <div className="bg-white w-full h-[calc(100vh-64px)] px-[2rem] py-[1rem] rounded-2xl shadow-md overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
