import { Outlet, Link } from "react-router-dom";

function Layout() {
    return (
      <>
        <h1 className="relative top-2 left-2">Fumo Game</h1>
        <nav>
          <ul className='grid grid-cols-4'>
            <li>
              <Link to="/">Game</Link>
            </li>
            <li>
              <Link to="/fumos">Fumos</Link>
            </li>
          </ul>
        </nav>
  
        <Outlet/>
      </>
    )
  }

export default Layout;