import {Link} from 'react-router-dom'
function Header() {
  const navbar = [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
    { label: "Post", path: "/post" },
    { label: "Admin", path: "/admin" },
    { label: "Lounge", path: "/lounge" },
    { label: "Editor", path: "/editor" },
    { label: "About", path: "/about" },
  ];    return (
    <header>
        <h1>My Site</h1>
        <nav>
            {navbar.map((item)=>{
                return  <Link key={item.path} to={item.path}>{item.label}</Link>
            })}
        </nav>
    </header>
  )
}

export default Header