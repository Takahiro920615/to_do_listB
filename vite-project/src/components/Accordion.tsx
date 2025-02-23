// Reactでアニメーションを作るためのライブラリ
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
// 型定義Typescript
type AccordionProps = {
  // trueなら開く、falseなら閉じる
  isOpen: boolean;
  // アコーディオンに入る要素
  children: React.ReactNode;
};

// isOpenとchildrenをprops（引数）として受け取っている
const Accordion: React.FC<AccordionProps> = ({ isOpen, children }) => {
  return (
    <motion.div
    // heightは最初の高さ（０）opacityは透明度０
      initial={{ height: 0, opacity: 0 }}
      // isOpenがtrueの時高さを自然な高さにしてくれる(auto) opacityはisOpenがtrueのとき１＝表示される
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      // 0.8秒で開閉、スムーズな加速と減速を入れている(easyInOut)
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* isOpenがtrueのとき、childrenを表示している。 */}
      {isOpen && <div>{children}</div>}
    </motion.div>
  );
};

export default Accordion;