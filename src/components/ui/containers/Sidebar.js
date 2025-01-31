const Sidebar = ({isOpen, children, style, isMobile, ...props}) => {
    return (
        <div
            className='sidebar'
            style={{
                ...style,
                width: isMobile ? '100%' : '350px',
                transform: isOpen ? 'translate(0)' : `translate(${isMobile ? '-100%' : '-350px'})` 
            }}
            {...props}
        >
            { children }
        </div>
    );
}
 
export default Sidebar;