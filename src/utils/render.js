import React from 'react'
import Root from '../containers/Root';

export default function render(Module,reducers){
    React.render(
        <Root Module={Module} reducers={reducers}></Root>,
        document.getElementById('root')
    )
}