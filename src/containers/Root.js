import React, { Component } from 'react'
import {Provider} from 'react-redux'
import configureStore from '../utils/configureStore';
import { BrowserRouter as Router, Route } from 'react-router-dom'
const Roots = (Module) => (
    <Router>
        <Route path="/" component={Module} />
        <Route path="/1" component={Module} />
    </Router>
)
export default class Root extends Component{
    render(){
        const { reducers,Module } = this.props,
            store = configureStore(reducers)
        return (
            <Provider store={store}>
                {Roots(Module)}
            </Provider>
        )
    }
}