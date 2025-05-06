function Navbar() {
  return (
    <nav className="navbar flex justify-center items-center p-4 bg-gray-800 text-white">
      <div className="navbar__logo">MyApp</div>
      <ul className="navbar__links flex space-x-4 ml-auto">
        <li className="hover:bg-amber-700 p-2 rounded-2xl">
          <a href="#home">Home</a>
        </li>
        <li className="hover:bg-amber-700 p-2 rounded-2xl">
          <a href="#about">About</a>
        </li>
        <li className="hover:bg-amber-700 p-2 rounded-2xl">
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
