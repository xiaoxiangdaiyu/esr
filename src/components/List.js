import React, { Component } from 'react'

export default class extends Component {
    constructor(props,context){
        super(props)
    }
    render(){
        let list = [1,2,3,4]
        return (
            <div>
                {list.map((item,i)=>{
                    return <li key = {i}>item</li>
                })}
            </div>
        )
    }
}