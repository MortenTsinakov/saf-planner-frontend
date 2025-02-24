import { Loading } from "components";

const Image = ({imageId, imageBlob}) => {

    const imageUrl = URL.createObjectURL(imageBlob);

    return (
        imageUrl ?
        <img
            src={imageUrl}
            alt={imageId}
            style={{borderRadius: '10px'}}
        /> :
        <Loading />
    );
}
 
export default Image;