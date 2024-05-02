import { useEffect } from 'react';
import './GalleryWrapper.css';
import ImageGallery from './ImageGallery';

const GalleryWrapper = ({ fetchImages }) => {
  useEffect(() => {
    console.log('gallery component updated');
  }, [fetchImages]);

    return (
        <div className='gallery__wrapper'>
          {fetchImages.map(imgs => <ImageGallery imageSrc={imgs.image}/>)}
        </div>
    )
};

export default GalleryWrapper;