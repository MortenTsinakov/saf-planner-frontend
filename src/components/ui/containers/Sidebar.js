const Sidebar = ({isOpen, children, style, isMobile, fromRight, ...props}) => {

    const width = isMobile ? '100%' : '500px';

    const getCorrectTranslate = () => {
        if (fromRight) {
            return width;
        }
        return `-${width}`;
    }
    
    return (
        <div
            className='sidebar'
            style={{
                ...style,
                width: width,
                transform: isOpen ? 'translate(0)' : `translate(${getCorrectTranslate()})`, 
                right: fromRight ? 0 : null,
                left: fromRight ? null : 0,
                borderLeft: isMobile ? 'none' : (fromRight ? '1px solid var(--main-gray)' : 'none'),
                borderRight: isMobile ? 'none' : (fromRight ? 'none' : '1px solid var(--main-gray)'),
                transition: isOpen ? 'transform 0.5s ease, opacity 0.5s ease' : 'transform 0.3s ease, opacity 0.5s ease, visibility 0s linear 0.5s',
            }}
            {...props}
        >
            { children }
        </div>
    );
}
 
export default Sidebar;