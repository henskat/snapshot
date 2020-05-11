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
                images: action.payload,

            };
        case Action.FinishAddingImage:
             return {
                 ...state,
                 images: [{...action.payload, isEditing: true}, ...state.images],
            };
        case Action.EnterEditMode:
            return {
                ...state,
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
                images: state.images.filter(image => image.id !== action.payload.id),
        };
        default: 
        return state;
    }
}

export default reducer;