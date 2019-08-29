import React from 'react'
import ReactDOM from 'react-dom'
import Root from '../containers/Root';

export default function render(Module,reducers){
    ReactDOM.render(
        <Root Module={Module} reducers={reducers}></Root>,
        document.getElementById('root')
    )
}