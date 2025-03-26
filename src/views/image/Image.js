import { Loading, Typography } from "components";
import { useState } from "react";

const Image = ({
    imageBlob,
    description,
}) => {

    const imageUrl = URL.createObjectURL(imageBlob);
    const [hovering, setHovering] = useState(false);

    return (
        imageUrl ?
        <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{
                position: 'relative',
                width: '100%',
            }}
        >    
            <img
                src={imageUrl}
                alt=""
                style={{
                    borderRadius: '10px',
                    aspectRatio: 16 / 9,
                    width: '100%',
                    minWidth: 256,
                    maxWidth: 1024,
                    minHeight: 144,
                    maxHeight: 576,
                    objectFit: 'contain',
                    backgroundColor: 'var(--background-color-medium)',
                }}
            />
            {
                description.length > 0 &&            
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        borderRadius: '0 0 10px 10px',
                        padding: '1rem',
                        opacity: hovering ? 1 : 0,
                        transition: 'opacity 0.2s ease-in-out',
                    }}
                >
                    <Typography fontSize='small' color='label'>
                        {description}
                    </Typography>
                </div>
            }
        </div>
        :
        <Loading />
    );
}
 
export default Image;