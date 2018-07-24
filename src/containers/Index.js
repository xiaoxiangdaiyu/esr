import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '../components/index'
export default class Index extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
        <div>
            测试
            <List></List>
            </div>
        )
    }
}