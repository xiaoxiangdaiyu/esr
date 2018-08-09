import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk';
export default configureStore = (reducer,initState)=>{
    return createStore(combineReducers(reducer), initState, compose(applyMiddleware(thunk)))
}