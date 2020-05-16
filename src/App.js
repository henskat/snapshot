import React, {useEffect} from 'react';
import './App.css';
import {Image} from './Image';
import {useSelector, useDispatch} from 'react-redux';
import {loadImage, startAddingImage} from './actions';

//use this idea for tags
const uri_edited ="";
const filters = "none";
const caption = "";
const tags = "";

function App() {

  const images = useSelector(state => state.images);
  const isWaiting = useSelector(state => state.isWaiting);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadImage(uri_edited, filters, caption, tags));
  }, [dispatch]);

  const onAdd = () => {
    dispatch(startAddingImage(uri_edited, filters, caption, tags));
  }

  return (
    <div id = "root">
      <div id = "left"></div>
      <div id = "middle">
        <div className="image-root">
          <div id = "oval"><h1>Snapshot</h1></div>
          <div id = "content">
            <p className = "directions">Welcome to the React app where you simply upload your favorite images and view other’s favorite pictures. Choose a caption, tag, and border color for your image. Even edit others! Simply start by pressing the upload button below, or filter through the images to find one pertaining to your theme with the filter button below!</p>
            <div id = "buttons">
              <button className = "button-commands button-style upload" onClick =  {onAdd}>Upload</button>
              <div className = "button-commands">
                <select id="filters" name="filters">
                  <option value="none">None</option>
                  <option value="nature">Nature</option>
                  <option value="animals">Animals</option>
                  <option value="people">People</option>
                  <option value="other">Other</option>
                </select>
                <button className = "button-style filter" onClick = {useEffect}>Filter</button>
              </div>
            </div>
          </div>
          {isWaiting && <div className = "spinner" />}
          <div className = "images">
            {images.map(image => <Image key = {image.id} image = {image} />)}
          </div>
        </div>
      </div>
      <div id = "right"></div>
    </div>
  );
}

export default App;
