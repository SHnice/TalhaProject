import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './drop-file-input.css';

import { ImageConfig } from '../../config/ImageConfig'; 
import uploadImg from '../../assets/cloud-upload-regular-240.png';

const DropFileInput = props => {
    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);
    const [morePics,setMorePics] = useState(false)

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const [fileType,setFileType] = useState(false)

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if(newFile.type.substring(0,5) === "image"){

            if (newFile) {
                setFileType(false)
                const updatedList = [...fileList, newFile];
                setFileList(updatedList);
                props.onFileChange(updatedList);
                setMorePics(true)
            }
        }else{
            setFileType(true)
        }

     
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
        setMorePics(false)
        
    }

    return (
        <> 
            {fileType && <h1 className='text-l mb-2 font-bold text-red-600'>Please Enter a image file</h1>} 
            <div
                ref={wrapperRef}
                className= "drop-file-input"
                style={{pointerEvents: morePics ? "none" : ""}}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                
                
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop your files here</p>
                </div>
               {!morePics && <input type="file" value="" onChange={onFileDrop} accept="image/*"/>} 
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to upload
                        </p>
                        {   
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    {/* <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" /> */}
                                    <img src={ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;
