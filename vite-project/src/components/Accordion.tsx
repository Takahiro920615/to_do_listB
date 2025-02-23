import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';

type AccordionProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ isOpen, children }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {isOpen && <div>{children}</div>}
    </motion.div>
  );
};

export default Accordion;