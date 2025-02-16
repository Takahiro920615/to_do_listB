import React from 'react';

 interface ProgressSelectProps {
  value: number;
  onChange: (value: number) => void;
 }

 const ProgressSelect: React.FC<ProgressSelectProps> = ({value, onChange}) => {
  const progressOptions = [0,10,20,30,40,50,60,70,80,90,100];

  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {progressOptions.map((progress) => (
        <option key={progress} value={progress}>
          {progress}%
        </option>
      ))}
    </select>
  );
};

export default ProgressSelect;