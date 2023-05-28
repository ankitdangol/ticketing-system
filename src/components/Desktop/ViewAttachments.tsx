import { Box, Typography, Dialog } from '@mui/material';
import { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../../index.css';

const ViewAttachments = (props: any) => {

    const [imageToOpen, setImageToOpen] = useState<any>();

    const handleImageToOpen = (images: any) => {
        setImageToOpen(images)
    }

    const [imageOpen, setImageOpen] = useState(false);

    const handleImageOpen = () => {
        setImageOpen(true);
    }

    const handleImageClose = () => {
        setImageOpen(false);
    }
    return (
        <>
            <Box onClick={() => { handleImageOpen(); handleImageToOpen(props.images); }} sx={{ cursor: 'pointer' }}>
                <Typography color='#3751FF' fontSize='14px'>View {props.url.length} attachment(s)</Typography>
            </Box>

            <Dialog open={imageOpen} onClose={handleImageClose} >
                {imageToOpen != null ?
                    <Carousel dynamicHeight showThumbs={false} >
                        {imageToOpen.map((image: string) => {
                            return < img src={image} key={image} />
                        })}
                    </Carousel>
                    :
                    ''
                }
            </Dialog>
        </>
    )
}

export default ViewAttachments;