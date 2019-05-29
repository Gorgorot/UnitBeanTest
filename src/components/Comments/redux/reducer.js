import immutable from 'immutable';

const Map = immutable.Map;

var reducer = (state = Map(), action)=>{
    switch(action.type){
        case 'SET_STATE':{
            return state.merge(action.state);
        }
        case 'ADD_COMMENT': {   
            return state.set('comments', [...state.get('comments'), action.newComment]);
        }
        default: break;
    }
    return state;
}

export default reducer;