function Header({ children }) {
  return (
    <header className="sticky z-100 w-full px-4 py-4 sm:px-10 sm:py-5 md:px-15 lg:px-30">
      <div className="mx-auto flex items-center justify-between">
        {children}
      </div>
    </header>
  );
}

export default Header;
