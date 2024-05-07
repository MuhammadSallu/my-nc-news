import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <header>
        <h1>NC News</h1>
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
