import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  darkBackground?: boolean;
  handleContainerClick?: () => void;
  className?: string;
};

const modalShowAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

const Modal = ({
  children,
  isOpen,
  darkBackground,
  handleContainerClick,
  className,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <motion.div
      {...modalShowAnimation}
      className={twMerge(
        `fixed left-[50%] top-[50%] z-[60] h-screen w-screen -translate-x-1/2 -translate-y-1/2 transform ${darkBackground ? "bg-transparentBlack" : "bg-transparent"}`,
        className,
      )}
      onClick={() => (handleContainerClick ? handleContainerClick() : null)}
      ref={modalRef}
    >
      <div
        className="fixed left-[50%] top-[50%] z-[65] -translate-x-1/2 -translate-y-1/2 transform"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Modal;
