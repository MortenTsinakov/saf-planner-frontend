import { Column } from 'components';

const ReadAll = ({readAllHeight, ...props}) => {
    return (
        <Column
            style={{
                border: '1px solid white',
                padding: '2rem',
                minWidth: '350px',
                maxWidth: '80vw',
                width: '350px',
                height: readAllHeight,
                overflowY: 'auto',
            }}
        >
            Panel for reading all long descriptions
        </Column>
    );
}
 
export default ReadAll;