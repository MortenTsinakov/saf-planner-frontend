import { Column, Container, IconButton, Row, TextButton, Typography } from "components";
import Label from "components/ui/labels/Label";
import { useEffect, useState } from "react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { useProjectStore } from "stores";
import Image from "views/image/Image";

const CurrentFragmentPanel = ({selectedFragmentIdx}) => {

    const {filteredFragments, fetchImage} = useProjectStore();
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchFragmentImages = async () => {
            if (filteredFragments.length <= selectedFragmentIdx) {
                return;
            }
            const fragment = filteredFragments[selectedFragmentIdx];
            let fetchedImages = [];
            for (const image of fragment.images) {
                const imageBlob = await fetchImage(image.image);
                fetchedImages.push({
                    imageId: image.image,
                    description: image.description,
                    imageBlob: imageBlob,
                });
            }
            setImages(fetchedImages);
        }

        fetchFragmentImages();
    }, [fetchImage, filteredFragments, selectedFragmentIdx]);

    return (
        <Column
            style={{
                flex: 1,
                padding: '3rem',
                overflowY: 'auto',
                gap: '2rem',
                maxHeight: 'calc(100vh - var(--navbar-height))',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <IconButton
                icon={<MdArrowUpward />}
            />
            {
                filteredFragments.length === 0 ?
                <Typography>No fragments to display...</Typography>
                :
                <Column
                    style={{
                        backgroundColor: 'var(--background-color-medium)',
                        padding: '5rem',
                        borderRadius: 10,
                        gap: '3rem'
                    }}
                >
                    <Typography color='label' fontSize='extrasmall'>
                        {selectedFragmentIdx + 1} / {filteredFragments.length}
                    </Typography>
                    <Column
                        style={{flex: 0.5}}
                    >
                        <Typography>
                            {filteredFragments[selectedFragmentIdx].longDescription}
                        </Typography>
                        <Row>
                            {filteredFragments[selectedFragmentIdx].labels.map(l => (
                                <Label
                                    key={l.id}
                                    color={l.color}
                                >
                                    {l.description}
                                </Label>
                            ))}
                        </Row>
                    </Column>
                    <TextButton
                        style={{
                            width: 'fit-content'
                        }}
                    >
                        <Typography
                            color='label'
                            fontSize='extrasmall'
                        >
                            Show images
                        </Typography>
                    </TextButton>
                    {/* {images.length > 0 &&                    
                        <Row
                            style={{flex: 0.5}}
                        >
                            {
                                images.map(im => (
                                    <Container
                                        key={im.imageId}
                                        style={{maxWidth: 300, border: '1px solid gray', borderRadius: 10}}
                                    >
                                        <Image
                                            imageBlob={im.imageBlob}
                                            description={im.description}
                                        />
                                    </Container>
                            ))}
                        </Row>
                    } */}
                </Column>
            }
            <IconButton
                icon={<MdArrowDownward />}
            />
        </Column>
    );
}
 
export default CurrentFragmentPanel;