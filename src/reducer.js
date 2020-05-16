  
import { Action } from "./actions";

const initialState = { 
    isWaiting: false,
    images: [],
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case Action.LoadImages:
            return {
                ...state,
                isWaiting: false,
                images: action.payload,

            };
        case Action.FinishAddingImage:
             return {
                 ...state,
                 isWaiting: false,
                 images: [{...action.payload, isEditing: true}, ...state.images],
            };
        case Action.EnterEditMode:
            return {
                ...state,
                isWaiting: false,
                images: state.images.map(image => {
                    if(image.id === action.payload.id) {
                        return {...image, isEditing: true};
                    } else {
                        return image;
                    }
                }),
            };
        case Action.LeaveEditMode:
            return {
                ...state,
                isWaiting: false,
                images: state.images.map(image => {
                    if(image.id === action.payload.id) {
                        return {...image, isEditing: undefined};
                    } else {
                        return image;
                    }
                }),
        };
        case Action.FinishSavingImage:
            return {
                ...state,
                isWaiting: false,
                images: state.images.map(image => {
                    if(image.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return image;
                    }
                }),
        };
        case Action.FinishUploadingImage:
            return {
                ...state,
                isWaiting: false,
                images: state.images.map(image => {
                    if(image.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return image;
                    }
                }),
        };
        case Action.FinishDeletingImage:
            return {
                ...state,
                isWaiting: false,
                images: state.images.filter(image => image.id !== action.payload.id),
        };
        case Action.StartWaiting:
            return {
                ...state,
                isWaiting: true,
            }
        default: 
        return state;
    }
}

export default reducer;