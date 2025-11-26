function Header({ children }) {
  return (
    <header className="relative z-100 mx-auto w-full max-w-[1750px] px-4 py-1 transition-all sm:px-10 sm:py-2 md:px-20 lg:px-30">
      <div className="mx-auto flex flex-wrap items-center justify-between max-md:gap-y-4">
        {children}
      </div>
    </header>
  );
}

export default Header;
