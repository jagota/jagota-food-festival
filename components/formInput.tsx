export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    type?: string;
    children?: React.ReactNode;
  }
export const FormInput = ({label, name, onChange, value, type, children}: FormInputProps) => {
  return (
    <div className="outline outline-0 relative border border-[#1A3860]/10 focus-within:border-[#006CFA]/76">
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        placeholder=""
        value={value}
        className="block h-[52px] py-2.5 pl-3 pr-12 w-full text-lg text-[#1C304A] text-opacity-80 appearance-none focus:outline-none bg-transparent"
      />
      <label
        htmlFor={name}
        className="absolute top-0 text-lg text-[#1C304A] text-opacity-80 bg-white py-2.5 pl-3 z-1 duration-300 origin-0"
      >
        {label}
      </label>
      {children ? children : null}
    </div>
  );
};
