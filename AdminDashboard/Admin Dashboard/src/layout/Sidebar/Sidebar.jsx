import { useEffect, useState } from 'react';
import { navigationLinks } from '../../data/data';
import "./Sidebar.css";
import { useContext } from 'react';
import { SidebarContext } from '../../context/sidebarContext';

const Sidebar = (props) => {
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);
  const [main, setMain] = useState(0);
  
  useEffect(() => {
    props.main(main)
  }, [main])

  useEffect(() => {
    if(isSidebarOpen){
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  return (
    <div className={ `sidebar ${sidebarClass}` }>
      <div className="user-info">
          <span className="info-name" style={{ color: 'white' }}>Admin Dashboard</span>
      </div>

      <nav className="navigation">
          <ul className="nav-list">
            {
              navigationLinks.map((navigationLink) => (
                <li className="nav-item" key={navigationLink.id}>
                  <button onClick={() => { setMain(navigationLink.id - 1) }} className={`nav-link ${main === navigationLink.id - 1 ? 'active' : ''}`}>
                      <img src={navigationLink.image} className="nav-link-icon" alt={navigationLink.title} />
                      <span className="nav-link-text" style={{ color: 'white' }}>{navigationLink.title}</span>
                  </button>
                  
                </li>
              ))
            }
          </ul>
      </nav>
    </div>
  )
}

export default Sidebar;
