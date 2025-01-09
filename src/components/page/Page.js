import './Page.css';


const Page = ({children, style, ...props}) => {
    return (
        <div
            className="page"
            style={style}
            {...props}
        >
            {children}
        </div>
    );
}
 
export default Page;