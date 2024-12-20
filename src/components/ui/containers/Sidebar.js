const Sidebar = ({isOpen, children, style, ...props}) => {
    return (
        <div
            className={`sidebar ${isOpen ? 'is-open' : 'is-closed'}`}
            style={style}
            {...props}
        >
            { children }
        </div>
    );
}
 
export default Sidebar;