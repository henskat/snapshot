import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {enterEditMode, leaveEditMode, startSavingImage, handleImageUpload, startDeletingImage} from './actions';

export function Image(props) {
    const image = props.image;
    const dispatch = useDispatch();

    const [image_uri_edited, setImageUriEdited] = useState(image.image_uri_edited);
    const [image_filters, setImageFilters] = useState(image.image_filters);
    const [image_caption, setImageCaption] = useState(image.image_caption);
    const [image_tags, setImageTags] = useState(image.image_tags);
    
    const onEdit = () => {
        dispatch(enterEditMode(image));
    }

    const onCancel = () => {
        dispatch(leaveEditMode(image));
    }

    const onSave = () => {

        // Details of the uploaded file 
        console.log(image_uri_edited); 
        
        dispatch(handleImageUpload(image_uri_edited));

        dispatch(startSavingImage({
            id: image.id,
            'image_uri_edited': image_uri_edited.name,
            image_filters,
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
                    <img src = {image.image_uri_edited} />
                    <input type = "text" value = {image_filters} onChange = { e => setImageFilters(e.target.value)}/> 
                    <input type = "text" value = {image_caption} onChange = { e => setImageCaption(e.target.value)}/> 
                    <button onClick = {onSave}>save</button>
                    <button onClick = {onCancel} >cancel</button>
                    <button className = "delete-button" onClick = {onDelete}>delete</button>
                </div>
                <div className = "image-right">
                    <textarea value = {image_tags} onChange = { e => setImageTags(e.target.value)}  />
                </div>
            </div>
            );
        }
        return (
            <div className = "image">
                <div className = "image-left">
                    <input type="file" accept = "png" onChange={ event => setImageUriEdited(event.target.files[0])} />                     
                    <input type = "text" value = {image_filters} onChange = { e => setImageFilters(e.target.value)}/> 
                    <input type = "text" value = {image_caption} onChange = { e => setImageCaption(e.target.value)}/> 
                    <button onClick = {onSave}>save</button>
                    <button onClick = {onCancel} >cancel</button>
                    <button className = "delete-button" onClick = {onDelete}>delete</button>
                </div>
                <div className = "image-right">
                    <textarea value = {image_tags} onChange = { e => setImageTags(e.target.value)}  />
                </div>
            </div>
        );
    } else {
        return (
            <div className = "image">
                <div className = "image-left">
                    <img src = {image.image_uri_edited} />
                    <span className = "image-filters">{image.image_filters}</span>
                    <span className = "image-caption">{image.image_caption}</span>
                    <span className = "image-tags">{image.image_tags}</span>
                    <button onClick = {onEdit}>edit</button>
                </div>
                <div className = "image-right">
                    {image.caption}
                </div>
            </div>
        );
    }
}