import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/IndexAction'
import List from '../components/List'
class Index extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let demo = this.props
        return (
        <div>
            测试
            <List list = {demo.list}></List>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        demo:state.demo
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {

}

export default connect(
    mapStateToProps,
    actions
)(Index)