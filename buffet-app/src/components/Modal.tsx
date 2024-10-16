import { AnimatePresence, motion } from "framer-motion";

type Modal = {
  children: React.ReactNode;
  isOpen: boolean;
  darkBackground?: boolean;
};

const Modal = ({ children, isOpen, darkBackground }: Modal) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed left-[50%] top-[50%] z-[60] h-screen w-screen -translate-x-1/2 -translate-y-1/2 transform ${darkBackground ? "bg-transparentBlack" : "bg-transparent"}`}
        >
          <div className="fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 transform">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
