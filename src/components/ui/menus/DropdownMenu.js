import './Menu.css';


const DropdownMenu = ({alignedBy, children, style, ...props}) => {
    return (
        <div
            className={`dropdown-menu aligned-${alignedBy}`}
            style={style}
            {...props}
        >
            {children}
        </div>
    );
}
 
export default DropdownMenu;