import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
export default configureStore = (reducer,initState)=>{
    return createStore(reducer, initState, compose(applyMiddleware(thunk)))
}