export const Action = Object.freeze({
    LoadImages: 'LoadImages',
    FinishAddingImage: 'FinishAddingImage',
    EnterEditMode: 'EnterEditMode',
    LeaveEditMode: 'LeaveEditMode',
    FinishSavingImage: 'FinishSavingImage',
    FinishDeletingImage: 'FinishDeletingImage',
    FinishUploadingImage: 'FinishUploadingImage',
    StartWaiting: 'StartWaiting',
});
export function startWaiting() {
    return {
        type: Action.StartWaiting,
    };
}

export function loadImages(images) {
    return {
        type: Action.LoadImages,
        payload: images,
    };
}

export function finishAddingImage(image) {
    return {
        type: Action.FinishAddingImage,
        payload: image,
    };
}

export function enterEditMode(image) {
    return {
        type: Action.EnterEditMode,
        payload: image,
    };
}

export function leaveEditMode(image) {
    return {
        type: Action.LeaveEditMode,
        payload: image,
    };
}

export function finishUploadingImage(image) {
    return {
        type: Action.FinishUploadingImage,
        payload: image,
    };
}
function checkForErrors(response) {
    if(!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`)
    }
    return response;
}

export function finishSavingImage(image) {
    return {
        type: Action.FinishSavingImage,
        payload: image,
    };
}
export function finishDeletingImage(image) {
    return {
        type: Action.FinishDeletingImage,
        payload: image,
    };
}

const host = 'https://snapshot.duckdns.org:8442';

export function loadImage() {
    return dispatch => {
        dispatch(startWaiting());
        fetch (`${host}/image/none`)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data => {
            if(data.ok) {
                dispatch(loadImages(data.image));
            }
        })
        .catch(e => console.error(e));
    };
}

export function startAddingImage(image_uri_edited, image_filters, image_caption, image_tags){ 
   const image = {image_uri_edited, image_filters, image_caption, image_tags};
   const options = {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(image),
   }
   console.log("adding" + JSON.stringify(image));

   return dispatch => {
        dispatch(startWaiting());
        fetch (`${host}/image`, options)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data => {
            if(data.ok) {
                image.id = data.id;
                dispatch(finishAddingImage(image));
            }
        })
        .catch(e => console.error(e));
    };
}
export function handleImageUpload(images) {
    console.log(images);
    // Create an object of formData 
    const formData = new FormData(); 
     
    // Update the formData object 
    formData.append( 
        "myFile", 
        images
    ); 
    console.log(formData);
    return dispatch => {
        dispatch(startWaiting());
        fetch(`${host}/upload/`, {
            method: 'POST',
            body: formData
          })
          .then(res => res.json())          // convert to plain text
          .then(data => {
            if(data.ok) {
                dispatch(finishUploadingImage(images));
            }         
         })
          .catch(error => {
            console.error(error)
          })
    }
  }

export function startSavingImage(image){
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(image),
    }
    console.log(JSON.stringify(image));
    return dispatch => {
        dispatch(startWaiting());
         fetch (`${host}/image/${image.id}`, options)
         .then(checkForErrors)
         .then(response => response.json())
         .then(data => {
             if(data.ok) {
                 dispatch(finishSavingImage(image));
             }
         })
         .catch(e => console.error(e));
     };
 }
 
 
export function startDeletingImage(image){
    const options = {
        method: 'DELETE',
    };
    console.log(JSON.stringify(image));
    return dispatch => {
        dispatch(startWaiting());
         fetch (`${host}/image/${image.id}`, options)
         .then(checkForErrors)
         .then(response => response.json())
         .then(data => {
             if(data.ok) {
                 dispatch(finishDeletingImage(image));
             }
         })
         .catch(e => console.error(e));
     };
 }
 
 export const uploadFile = (filename) => {
    let file = filename.replace(/^.*\\/, "");

    // check file type
   if(!['image/jpeg', 'image/gif', 'image/png', 'image/svg+xml'].includes(file.type)) {
        console.log('Only images are allowed.');
       return;
   }
   
   // check file size (< 2MB)
   if(file.size > 2 * 1024 * 1024) {
       console.log('File must be less than 2MB.');
        return;
   }
   

   // add file to FormData object
   const fd = new FormData();
   fd.append('avatar', file);

   console.log(fd);

   // send `POST` request
   fetch(`${host}/image/upload`, {
       method: 'POST',
       body: fd
   })
   .then(res => res.json())
   .then(json => console.log(json))
   .catch(err => console.error(err));
}