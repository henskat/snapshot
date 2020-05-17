import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {enterEditMode, leaveEditMode, startSavingImage, handleImageUpload, startDeletingImage} from './actions';

export function Image(props) {
    const image = props.image;
    const dispatch = useDispatch();
    const [image_uri_edited, setImageUriEdited] = useState(image.image_uri_edited);
    const [image_filters, setImageFilters] = useState(image.image_filters);
    const [image_caption, setImageCaption] = useState(image.image_caption);
    const [image_fit, setImageFit] = useState(image.image_fit);
    const [image_tags, setImageTags] = useState(image.image_tags);
    let firstUpload = false; 

    const onEdit = () => {
        dispatch(enterEditMode(image));
    }

    const onCancel = () => {
        dispatch(leaveEditMode(image));
    }

    const onSave = () => {
        if(firstUpload && image_uri_edited === "") {
            return;
        }
        if(firstUpload) {
        // check file size (< 2MB)
            if(image_uri_edited.size > 3 * 1024 * 100) {
                alert("Image is too big. Upload must be less than 300KB")
                return;
            } else {
               dispatch(handleImageUpload(image_uri_edited));
            }
        }
        dispatch(startSavingImage({
            id: image.id,
            'image_uri_edited': firstUpload ? image_uri_edited.name : image_uri_edited,
            image_filters,
            image_fit,
            image_caption,
            image_tags,
        }));


    }

    const onDelete = () => {
        dispatch(startDeletingImage(image));
    }



    if(image.isEditing) {
        if(image.image_uri_edited !== "") {
            return (
            <div className = "image">
                <div className = "image-left">
                    <img style = {{borderColor: image.image_filters, objectFit: image.image_fit === 'border' ? 'cover' : 'contain'}} className = "image-pic" src = {image.image_uri_original} alt = {image.caption}/>
                    <span style = {{borderColor: image.image_filters, backgroundColor: image.image_filters}} className = "image-caption">Caption: <input type = "text" value = {image_caption} onChange = { e => setImageCaption(e.target.value)}/></span>
                    <button className = "button-image save" onClick = {onSave}>save</button>
                    <button className = "button-image-cancel" onClick = {onCancel} >X</button>
                    <button className = "button-image delete" onClick = {onDelete}>delete</button>
                </div>
                <div className = "image-right">
                    <p className = "image-settings">Image Settings </p>
                    <span className = "image-settings-border">Border color: <input type = "color" value = {image_filters} onChange = { e => setImageFilters(e.target.value)}/></span>
                    <span className = "image-settings-tags"> Tag:
                    <select className = "edit-select" value = {image_tags} onChange = { e => setImageTags(e.target.value)} id="filters" name="filters">
                        <option value="nature" >Nature</option>
                        <option value="animals">Animals</option>
                        <option value="people">People</option>
                        <option value="other">Other</option>
                    </select>
                    </span>
                    <span className = "image-settings-tags"> Image fit:
                    <select  className = "edit-select" value = {image_fit} onChange = { e => setImageFit(e.target.value)} id="filters" name="filters">
                        <option value="border">Fit border</option>
                        <option value="image">Fit image</option>
                    </select>
                    </span>
                </div>
            </div>
            );
        } else {
            firstUpload = true;
            return (
                <div className = "new-image">
                     <input className = "file-upload-button" type="file" accept = "image/png, image/jpeg" onChange={ event => setImageUriEdited(event.target.files[0])} />                     
                    <div className = "new-image-buttons">
                        <button className = "new-image-button upload-button" onClick = {onSave}>upload</button>
                        <button className = "new-image-button cancel" onClick = {onDelete}>cancel</button>
                    </div>
                </div>
            );
        }
    } else {
        return (
            <div className = "image">
                <div className = "image-left">
                    <img className = "image-pic" style = {{borderColor: image.image_filters, objectFit: image.image_fit === 'border' ? 'cover' : 'contain'}} src = {image.image_uri_original} alt = {image.caption} />
                    <span className = "image-caption" style = {{borderColor: image.image_filters, backgroundColor: image.image_filters}} >{image.image_caption}</span>
                    <button className = "image-edit" onClick = {onEdit}>Click to edit</button>
                </div>
                <div>
                    {image.caption}
                </div>
            </div>
        );
    }
}