import { Loading } from "components";

const Image = ({
    imageId,
    imageBlob,
    maxSize=750,
}) => {

    const imageUrl = URL.createObjectURL(imageBlob);

    return (
        imageUrl ?
        <img
            src={imageUrl}
            alt=""
            style={{
                borderRadius: '10px',
                width: '100%',
                minWidth: 200,
                maxWidth: 750,
                height: '100%',
                minHeight: 200,
                maxHeight: 750,
                objectFit: 'contain',
                backgroundColor: 'var(--background-color-medium)',
            }}
        /> :
        <Loading />
    );
}
 
export default Image;