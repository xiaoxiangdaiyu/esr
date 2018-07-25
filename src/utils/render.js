import React from 'react'
import Root from '../pages/Root';

export default function render(Root,Module,reducers){
    React.render(
        <Root Module={Module} reducers={reducers}></Root>,
        document.getElementById('root')
    )
}