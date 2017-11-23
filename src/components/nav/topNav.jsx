import React, {Component} from 'react'
import render from 'react-dom'
import './topNav.scss'

export default class TopNavigation extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="hp-topNav-main">
                <p>test top nav</p>
            </div>);
    }
}