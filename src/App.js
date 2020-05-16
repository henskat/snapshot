import React, {useEffect} from 'react';
import './App.css';
import {Image} from './Image';
import {useSelector, useDispatch} from 'react-redux';
import {loadImage, startAddingImage} from './actions';

//use this idea for tags
const uri_edited ="";
const filters = "";
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
    <div className="image-root">
      <h1>Snapshot</h1>
      <p>Welcome to the React app where you simply upload your favorite images and view other’s favorite pictures. Choose a caption, tag, and border color for your image. Even edit others! Simply start by pressing the upload button below, or filter through the images to find one pertaining to your theme with the filter button below!</p>
      <div><button onClick =  {onAdd}>Upload</button><div><input></input><button>Filter</button></div></div>
      {isWaiting && <div className = "spinner" />}
      {images.map(image => <Image key = {image.id} image = {image} />)}
    </div>
  );
}

export default App;
