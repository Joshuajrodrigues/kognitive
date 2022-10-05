import React, { FunctionComponent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "phosphor-react";
import { CbtFormType } from "../hooks/useCbtForm";
const spring = {
  type: "spring",
  damping: 10,
  stiffness: 100,
  duration: 0.2,
};
const Drawer: FunctionComponent<{
    children:ReactNode;
  showDrawer: boolean;
  onClose: () => void;

}> = ({ showDrawer, onClose,children }) => {
  return (
    <>
      <AnimatePresence>
        {showDrawer && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: 300,
            }}
            exit={{
              width: 0,
              transition: { delay: 0.2, duration: 0.3 },
            }}
            className="drawer"
          >
            <motion.a
             initial={{ width: 0 }}
             animate={{
               width: 300,
             }}
             exit={{
               width: 0,
               transition: { delay: 0.2, duration: 0.3 },
             }}
            className="close-btn" onClick={onClose}>
              <X color="red" size={32} />
            </motion.a>

            <div className="drawer-content">
                {children}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Drawer;
