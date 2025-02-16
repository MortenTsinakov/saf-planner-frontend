import { Column } from 'components';

const FragmentImages = () => {
    return (
        <Column
            style={{
                border: '1px dashed gray',
                borderRadius: '10px',
                flex: 1,
                minWidth: '300px', 
                height: '100%',
                justifyContent: 'center',
                textAlign: 'center',
            }}
        >
            Images attached to fragments should appear here
        </Column>
    );
}
 
export default FragmentImages;