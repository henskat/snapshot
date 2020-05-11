import React, {useEffect} from 'react';
import './App.css';
import {Image} from './Image';
import {useSelector, useDispatch} from 'react-redux';
import {loadImage, startAddingImage} from './actions';

//use this idea for tags
const uri_original = "";
const uri_edited ="";
const filters = "";
const caption = "";
const tags = "";

function App() {

  const images = useSelector(state => state.images);
  const dispatch = useDispatch();
useEffect(() => {
    dispatch(loadImage(uri_original, uri_edited, filters, caption, tags));
  }, [dispatch]);

  const onAdd = () => {
    dispatch(startAddingImage(uri_original, uri_edited, filters, caption, tags));
  }

  return (
    <div className="image-root">
      <button onClick =  {onAdd}>Add Image</button>
      {images.map(image => <Image key = {image.id} image = {image} />)}
    </div>
  );
}

export default App;