export const Action = Object.freeze({
    LoadImages: 'LoadImages',
    FinishAddingImage: 'FinishAddingImage',
    EnterEditMode: 'EnterEditMode',
    LeaveEditMode: 'LeaveEditMode',
    FinishSavingImage: 'FinishSavingImage',
    FinishDeletingImage: 'FinishDeletingImage',
});

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
        fetch (`${host}/image/`)
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

export function startAddingImage(image_uri_original, image_uri_edited, image_filters, image_caption, image_tags){
   const image = {image_uri_original, image_uri_edited, image_filters, image_caption, image_tags};
   const options = {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(image),
   }
   console.log("adding" + JSON.stringify(image));

   return dispatch => {
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
 