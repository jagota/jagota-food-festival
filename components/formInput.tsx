export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string
  }
export const FormInput = ({label, name, onChange, value}: FormInputProps) => {
  return (
    <div className="outline outline-0 relative border-2 focus-within:border-blue-500">
      <input
        type="text"
        id={name}
        name={name}
        onChange={onChange}
        placeholder=" "
        value={value}
        className="block p-2 w-full text-base appearance-none focus:outline-none bg-transparent"
      />
      <label
        htmlFor={name}
        className="absolute top-0 text-base bg-white p-2 -z-1 duration-300 origin-0"
      >
        {label}
      </label>
    </div>
  );
};
