function Sidebar({ children }) {
    return (
      <div className="Sidebar">
        <h3 className="logo"><span>T</span>Tribe.com</h3>
        <div className="sidebar-links">{children}</div>
      </div>
    );
  }
  
  export default Sidebar;