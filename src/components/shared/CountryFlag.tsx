type CountryFlagProps = {
  code: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "h-4 w-6",
  md: "h-5 w-7",
  lg: "h-6 w-9",
};

const CountryFlag = ({ code, size = "md", className = "" }: CountryFlagProps) => {
  return (
    <img
      src={`/flags/${code}.svg`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`${sizeClasses[size]} inline-block shrink-0 rounded-[2px] object-cover ${className}`.trim()}
    />
  );
};

export default CountryFlag;