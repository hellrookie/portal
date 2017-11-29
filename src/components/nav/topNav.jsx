import React, {Component} from 'react'
import render from 'react-dom'
import './topNav.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class TopNavigation extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="hp-topNav-main container">
                <div className="row">
                    <div className="hidden-xs">
                        <ul className="nav nav-pills">
                            <li className="active"><a href="#">Hellrookie</a></li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                        </ul>
                    </div>
                    <div className="visible-xs">
                        <ul className="nav nav-pills">
                            <li className="active"><a href="#">Hellrookie-Mobile</a></li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                    Menu <span class="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>);
    }
    
}