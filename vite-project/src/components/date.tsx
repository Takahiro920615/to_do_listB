import React, {useEffect, useState} from "react";
// import Dropdown from "@/Components/Navgation/Dropdown";

const DateDisplay = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1; // getMonth() は 0-11 を返すので +1
  const day = today.getDate();

  return (
    <div>
      <p>{year}年{month}月{day}日</p>
    </div>
  );
};

export default DateDisplay;




  

 



