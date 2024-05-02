import { useState } from 'react';
import './GalleryWrapper.css';
import ImageOptions from './ImageOptions';

const ImageGallery = ({ imageSrc }) => {
    const [isShow, setShow] = useState(false);

    const showOnEnter = () => {
        setShow(true);
    };

    const hideOnLeave = () => {
        setShow(false);
    };

    return (
        <div onMouseEnter={() => showOnEnter()} onMouseLeave={() => hideOnLeave()} className='image__gallery'>
            {isShow && <ImageOptions downloadURL={imageSrc}/>}
            <img src={imageSrc} alt='img' />
        </div>
    )
};

export default ImageGallery;