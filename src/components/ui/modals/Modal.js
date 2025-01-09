import './Modal.css';


const Modal = ({children, style, ...props}) => {
    return (
        <div className="modal-wrapper">
            <div
                className="modal"
                style={style}
                {...props}
            >
                {children}
            </div>
        </div>
    );
}
 
export default Modal;