import { Column } from "components";

const SharedProjectComments = () => {
    return (
        <Column
            style={{
                flex: 0.25,
                border: '1px dashed gray',
                alignItems: 'center',
            }}
        >
            In the future, there will be a box for
            adding comments here. And maybe a list
            of comments from others as well...
        </Column>
    );
}
 
export default SharedProjectComments;