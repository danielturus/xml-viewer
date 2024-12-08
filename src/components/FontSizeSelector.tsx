import { useState } from "react";
type Props = {
  onFontChange: (payload: string) => void;
};

export const FontSizeSelector = ({ onFontChange }: Props) => {
  const [value, setValue] = useState(2);

  const textClasses = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);

    onFontChange(textClasses[newValue]);
  };

  return (
    <div>
      <label htmlFor="fontSizeSelect" className="block mt-2">
        Select font size
      </label>
      <input
        type="range"
        id="fontSizeSelect"
        name="fontSizeSelect"
        min="0"
        max="4"
        value={value}
        onChange={handleChange}
        className="w-full"
      />
    </div>
  );
};
