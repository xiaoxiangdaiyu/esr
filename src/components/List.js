import {Component} from 'react'

export default class extends Component {
    constructor(props,context){
        super(props)
    }
    render(){
        let {list} = this.props
        return (
            <div>
                {list.map((item,i)=>{
                    return <li key = {i}>item</li>
                })}
            </div>
        )
    }
}