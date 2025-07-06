import React from "react";

type BtnProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  bgColor?: string;
  textColor?: string;  
  className?: string;
  padding?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  scaleOption?: string;
  hoverColor?: string;
  hoverTextColor?: string;
};

export default function Btn({
  onClick,
  bgColor = "bg-brand",
  textColor = "text-white",
  hoverColor = "hover:bg-brandHover",
  hoverTextColor = "hover:text-white",
  className = "",
  padding = "px-4 py-2",
  children,
  disabled = false,
  scaleOption = "hover:scale-105",
}: BtnProps) {
  if (disabled) {
    bgColor = "bg-gray-400";
    hoverColor = "";
    textColor = "text-gray-200";
  }

  return (
    <button
      onClick={onClick}
      className={`
        rounded-md transition-all
        transition-colors
        transition
        transition-transform  
        duration-300 ease-in-out
        ${hoverTextColor}
        ${scaleOption} ${hoverColor} ${padding}
        ${bgColor} ${textColor} ${className}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
