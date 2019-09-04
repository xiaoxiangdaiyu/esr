import React, { Component } from 'react'

export default class extends Component {
    constructor(props,context){
        super(props)
    }
    render(){
        let list = ['测试',12,223,222]
        return (
            <div>
                {list.map((item,i)=>{
                    return <li key = {i}>测试项目{item}</li>
                })}
            </div>
        )
    }
}