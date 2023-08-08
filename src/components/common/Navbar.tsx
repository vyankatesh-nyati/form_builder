import { Link } from "react-router-dom";
const Navbar = (): JSX.Element => {
  return (
    <nav className="bg-[#001C30] text-white flex justify-between items-center">
      <h1 className="text-2xl p-4 pl-8 font-semibold text-white shadow-lg">
        Form Builder
      </h1>
      <ul className="flex gap-8 mr-8">
        <li>
          <Link to="/">All Forms</Link>
        </li>
        <li>
          <Link to="/create-new-form">Create New Form</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
