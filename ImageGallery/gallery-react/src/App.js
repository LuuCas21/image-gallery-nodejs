import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import InputWrapper from './components/InputWrapper';
import GalleryWrapper from './components/GalleryWrapper';

const App = () => {
  const [isUpdated, setUpdated] = useState(false);
  const [allImages, setAllImages] = useState([]);

  const getAllImages = async () => {
    try {
      const { data: { images } } = await axios.get('http://localhost:5000/api/v1/images');
      setAllImages(images);
      console.log(images);
    } catch(err) {
      console.log(err);
    }
  };

  const isUpdatedHandler = () => {
    setUpdated(!isUpdated);
    console.log('component updated');
  }

  useEffect(() => {
    getAllImages();
  }, [isUpdated])

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <div className="wrapper">
      <InputWrapper isUpdatedHandler={isUpdatedHandler} />
      <GalleryWrapper fetchImages={allImages}/>
    </div>
  );
}

export default App;
