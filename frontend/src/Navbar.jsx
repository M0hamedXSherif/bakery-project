function Navbar({ theme, onToggleTheme, username }) {
  return (
    <nav className="navbar">
      <button className="theme-btn" onClick={onToggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <span className="navbar-logo">🥐</span>
      <span className="navbar-username">{username}</span>
    </nav>
  )
}

export default Navbar