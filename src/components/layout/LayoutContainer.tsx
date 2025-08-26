import { type ReactNode } from "react";
import clsx from "clsx";

interface LayoutContainerProps {
  children: ReactNode;
  className?: string;
}

const LayoutContainer = ({ children, className }: LayoutContainerProps) => {
  return (
    <div className={clsx("px-1 md:px-2 sm:px-2 lg:px-20", className)}>
      {children}
    </div>
  );
};

export default LayoutContainer;
