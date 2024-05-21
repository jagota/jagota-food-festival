import cntl from "cntl";
import * as React from "react";

type Variant = "primary" | "secondary" | "danger" | "success";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText?: string;
  onClick?: () => void;
  variant?: Variant,
  classNames?: string
}

const classes = {
  button: (variant?: Variant, classNames?: string) => cntl`
  group min-w-32 mt-[2rem] overflow-hidden rounded-full border-[2px] text-2xl font-bold 
  h-[50px] relative before:content-[''] before:absolute before:inset-0 before:rounded-full 
   before:w-[0%] before:duration-300 hover:before:w-[100%]
  ${variant === 'primary' ? 'text-white before:bg-white bg-transparent' : ''}
  ${variant === 'secondary' ? 'font-normal text-white before:bg-cyan-500 bg-blue-500' : ''}
  ${classNames}
  `,
  buttonText: (variant?: Variant) => cntl`
  text-base absolute z-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
  ${variant === 'primary' ? 'group-hover:text-blue-500' : ''}
  ${variant === 'secondary' ? 'group-hover:text-white' : ''}

  `
}

const PrimaryButton = ({ onClick, buttonText, variant = "primary", classNames = '' }: ButtonProps) => {
  return (
    <button onClick={onClick} className={classes.button(variant, classNames)}>
        <span className={classes.buttonText(variant)}>
            {buttonText}
        </span>
    </button>
  );
};

export { PrimaryButton };
