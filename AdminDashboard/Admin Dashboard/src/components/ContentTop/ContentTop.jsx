import { iconsImgs } from "../../utils/images";
import "./ContentTop.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";

const ContentTop = () => {
  const logout = () => {
    window.open(`http://localhost:5173`, "_self");
};
  const { toggleSidebar } = useContext(SidebarContext);
  return (
    <div className="dd">
    <div className="main-content-top">
        <div className="content-top-left">
            <button type="button" className="sidebar-toggler" onClick={() => toggleSidebar() }>
                <img src={ iconsImgs.menu } alt="" />
            </button>
            <h3 className="content-top-title">Alert Trace</h3>
            <div className='log1222'>
          <button onClick={logout} className='a11' >
                Logout
            </button>
          </div>
        </div>
    </div>
    </div>
  )
}

export default ContentTop
