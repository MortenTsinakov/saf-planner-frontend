import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = (props) => {
    return (
        <nav>
            {props.isMobile && <MobileNavbar {...props} />}
            {!props.isMobile && <DesktopNavbar {...props} />}
        </nav>
    );
}
 
export default Navbar;