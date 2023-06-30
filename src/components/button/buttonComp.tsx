import { MouseEventHandler } from "react";


type ButtonProps = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
}) => (
  <button className="button" onClick={onClick} disabled={disabled}>
    {text}
  </button>
);
