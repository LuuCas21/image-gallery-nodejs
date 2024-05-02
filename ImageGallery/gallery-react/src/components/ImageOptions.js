import './ImageOptions.css';
import { FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ImageOptions = ({ downloadURL }) => {
    const iconStyles = {
        fontSize: '30px',
        color: 'white',
        margin: '0 8px',
        cursor: 'pointer'
    };

    return (
        <div className='image__options'>
            <FaDownload onClick={() => window.open(downloadURL)} style={iconStyles}/>
            <MdDelete style={iconStyles}/>
        </div>
    )
};

export default ImageOptions;