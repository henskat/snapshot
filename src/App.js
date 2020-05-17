import React, {useEffect} from 'react';
import './App.css';
import {Image} from './Image';
import {useSelector, useDispatch} from 'react-redux';
import {loadImage, startAddingImage} from './actions';

//use this idea for tags
const uri_edited ="";
let filters = "none";
const image_filters = "#000000";
const fit = "border";
const caption = "Click image to edit";
const tags = "nature";

function App() {

  const images = useSelector(state => state.images);
  const isWaiting = useSelector(state => state.isWaiting);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadImage(uri_edited, image_filters, fit, caption, tags, filters));
  }, [dispatch]);

  const onAdd = () => {
    dispatch(startAddingImage(uri_edited, image_filters, fit, caption, tags, filters));
  }
  const onChange = () => {
    console.log(filters);
    dispatch((loadImage(uri_edited, image_filters, fit, caption, tags, filters)));
  }

  function onUpdate(image) {
    dispatch(loadImage(image.image_uri_edited, image.image_filters, image.image_fit, image.image_caption, image.image_tags, filters));
}

  return (
    <div id = "root">
      <div id = "left"></div>
      <div id = "middle">
        <div className="image-root">
          <div id = "oval"><h1>Snapshot</h1></div>
          <div id = "content">
            <p className = "directions"><b>Welcome to Snapshot!</b> Upload your favorite images and view other’s favorites. Have fun uploading on Snapshot and don’t forget to share with your friends!</p>
            <div className = "text">
              <ul>
                <li>Simply start by clicking the upload button below! Note that all pictures are JPG’s or PNG’s, and we only accept image sizes of less than 300KB.</li>
                <li> After uploading your image, just click on it to add a caption, change the tag, choose the right image fit, and find the perfect border color! </li>
                <li>If you have no images to share, feel free to edit other pictures and find your favorite theme using the filter option below.</li>
              </ul>
            </div>
            <div id = "buttons">
              <button className = "button-commands button-style upload" onClick =  {onAdd}>Upload</button>
              <div className = "button-commands">
                <select id="filters" name="filters" onChange = {e => filters = e.target.value}>
                  <option value="none">None</option>
                  <option value="nature">Nature</option>
                  <option value="animals">Animals</option>
                  <option value="people">People</option>
                  <option value="other">Other</option>
                </select>
                <button className = "button-style filter" onClick = {onChange}>Filter</button>
              </div>
            </div>
          </div>
          {isWaiting && <div className = "center"><div className = "spinner one"/><div className = "spinner two"/><div className = "spinner three"/></div>}
          <div className = "images">
            {images.map(image => image.image_uri_original === undefined && image.image_uri_edited !== "" ? onUpdate(image) : <Image key = {image.id} image = {image} filters = {filters} />)}
          </div>
        </div>
      </div>
      <div id = "right"></div>
    </div>
  );
}

export default App;
