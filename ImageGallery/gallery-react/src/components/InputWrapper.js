import { useState, useRef, useEffect } from 'react';
import { IoMdCheckmark } from "react-icons/io";
import axios from 'axios';
import './InputWrapper.css';

const InputWrapper = ({ isUpdatedHandler }) => {
    const [fileDir, setFileDir] = useState('');
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);

    let url = 'http://localhost:5000/api/v1/images';

    const inputField = useRef(null);

    // SEND FILE TO THE SERVER
    const getFileHandler = async (e) => {
        console.log('Choosing file');
        try {
        const imageFile = e.target.files[0];
        const imageData = new FormData();
        imageData.append('image', imageFile);

        const { data: { src } } = await axios.post(`${url}/uploads`, imageData, {
            'Content-Type': 'multipart/form-data'
        });

        setIsUploaded(true);

        console.log('This is the img url coming from input file');
        console.log(src);

        setFileDir(src);

        } catch (err) {
            console.log(err);
        }
    };

    // SEND FILE PATH TO THE DATABASE

    const sendFileToDBHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(url, { name: fileName, image: fileDir }, {
                'Content-Type': 'multipart/form-data'
            });

            console.log('Image sent to DB');
            isUpdatedHandler();
            setIsUploaded(false);

            inputField.current.reset();

        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        inputField.current.style.color = '';
    }, []);

    return (
      <div className='input__wrapper'>
        <form ref={inputField} className='form__input' onSubmit={(e) => sendFileToDBHandler(e)}>
            <label>Image Name</label>
            <input onChange={(e) => setFileName(e.target.value)} type='text' name='name' placeholder='image name'/>
            <label>Upload Image</label>
            <div className='file_input_check'>
            <input className='file__input' onChange={(e) => getFileHandler(e)} style={{ padding: '0', color: 'white' }} name='image' type='file'/>
            {isUploaded && <IoMdCheckmark style={{ marginLeft: '8px', color: 'green' }} />}
            </div>
            <button type='submit'>UPLOAD</button>
        </form>
      </div>
    )
};

export default InputWrapper;

