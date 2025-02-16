import { IconButton, Row } from 'components';
import { MdArticle, MdGridView, MdOutlineTv } from "react-icons/md";

const Toolbar = ({height, showReadAllPanel, setShowReadAllPanel, views, currentView, setCurrentView}) => {
    return (
        <Row
            style={{
                alignItems: 'center',
                padding: '2rem',
                height: height,
            }}
        >
            <IconButton
                icon={<MdArticle />}
                title='Read detailed descriptions'
                onClick={() => setShowReadAllPanel(!showReadAllPanel)}
            />
            {
                currentView === views.FRAGMENT_GRID ?
                <IconButton
                    icon={<MdOutlineTv />}
                    title='Switch to Presentation View'
                    onClick={() => setCurrentView(views.PRESENTATION)}
                />
                :
                <IconButton
                    icon={<MdGridView />}
                    title='Switch to Grid View'
                    onClick={() => setCurrentView(views.FRAGMENT_GRID)}
                />
            }
        </Row>
    );
}
 
export default Toolbar;