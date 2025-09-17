function Header({ children }) {
  return (
    <header className="z-100 mx-auto w-full max-w-[1750px] px-4 py-3 sm:px-10 sm:py-4 md:px-15 lg:px-30">
      <div className="mx-auto flex items-center justify-between">
        {children}
      </div>
    </header>
  );
}

export default Header;
