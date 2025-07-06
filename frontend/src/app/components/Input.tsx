
export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
}: {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`px-4 py-2 border shadow-sm rounded-md text-text focus:outline-none focus:ring-2 focus:ring-brand transition-colors ${className}`}
    />
  );
}