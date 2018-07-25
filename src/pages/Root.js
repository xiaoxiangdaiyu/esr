import {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from '../utils/configureStore';
export default class Root extends Component{
    render(){
        const { reducers,Module } = this.props,
            store = configureStore(reducers)
        return (
            <Provider store={store}>
                <Module />
            </Provider>
        )
    }
}