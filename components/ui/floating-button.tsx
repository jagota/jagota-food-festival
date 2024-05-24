import * as React from "react";
import cntl from "cntl";

const classes = {
  button: (color?: string, size?: string) => cntl`
  z-10 p-0   rounded-full
  active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none
  ${color ? color : "bg-red-500 hover:bg-red-700"}
  ${size ? size : "w-14 h-14"}
  `,
  buttonContainer: (position?: string) => cntl`
  flex flex-col items-center gap-1
  ${position ? position : "fixed bottom-10 right-10"}
  `,
  text: (textClasses?: string) => cntl`
  ${textClasses ? textClasses : "text-xs text-gray-600"}
  `
};

type floatingButtonType =
  | "plus"
  | "minus"
  | "close"
  | "check"
  | "menu"
  | "audio"
  | "photo";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  contentType?: floatingButtonType;
  onClick?: () => void;
  position?: string;
  color?: string;
  size?: string;
  text?: string;
  textClasses?: string;
}

const FloatingButton = ({
  onClick,
  contentType,
  position,
  color,
  size,
  text,
  textClasses
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };
  const renderSVG = () => {
    if (contentType === "close") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-6 h-6 inline-block"
        >
          <path
            fill="#FFFFFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      );
    } else if (contentType === "audio") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-6 h-6 inline-block"
        >
          <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
          <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
        </svg>
      );
    } else if (contentType === "photo") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-6 h-6 inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
          />
        </svg>
      );
    }
    return (
      <svg
        viewBox="0 0 20 20"
        enableBackground="new 0 0 20 20"
        className="w-6 h-6 inline-block"
      >
        <path
          fill="#FFFFFF"
          d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
        />
      </svg>
    );
  };
  return (
    <div className={classes.buttonContainer(position)}>
      <button onClick={handleClick} className={classes.button(color, size)}>
      {renderSVG()}
    </button>
    {text ? <p className={classes.text(textClasses)}>{text}</p> : null}
    </div>
  );
};

export { FloatingButton };
