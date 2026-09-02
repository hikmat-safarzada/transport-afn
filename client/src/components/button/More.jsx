function More({ size = "md", fullWidth = false, className = "" }) {
  const sizes = {
    sm: "px-5 py-1.5 text-xs",
    md: "px-8 py-2.5 text-sm",
    lg: "px-10 py-3 text-base",
  };

  return (
    <div
      className={`inline-flex items-center justify-center border-2 border-orange-500 text-[#F36F20] font-semibold rounded-md hover:bg-orange-500 hover:text-white transition duration-200 cursor-pointer ${
        fullWidth ? "w-full" : "w-fit"
      } ${sizes[size]} ${className}`}
    >
      Ətraflı
    </div>
  );
}

export default More;