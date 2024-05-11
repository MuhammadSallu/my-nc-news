import { Link } from "react-router-dom";
function Header({ user }) {
  return (
    <>
      <header>
        <h1>NC News</h1>
        <h4>Logged in as: {user}</h4>
        <nav>
          <Link className="nav-bar" to="/">
            Home
          </Link>
          <Link className="nav-bar" to="/api/articles">
            Articles
          </Link>
        </nav>
      </header>
    </>
  );
}
export default Header;
