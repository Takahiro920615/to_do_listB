import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import React, { useState, useEffect } from 'react';

type Props = {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
};
const SimpleDatePicker: React.FC<Props> = ({ selectedDate, onChange}) => {

  return(
    <DatePicker
          selected={selectedDate}
          onChange={onChange}
          dateFormat="yyyy/MM/dd"
          />
  );       
};


  
export default SimpleDatePicker;