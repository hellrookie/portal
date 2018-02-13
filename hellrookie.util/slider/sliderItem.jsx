import React, {Component} from 'react'
import './slider.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class SliderItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let itemProp = {
            height: '100%',
            width: '100%',
            objectFit: 'cover'
        };
        if (this.props.isActive) {
            return (
                <div className="item active hellrookie-util-full-size">
                    <a href={this.props.link}>
                        <img src={this.props.img} style={itemProp}/>
                        <div className="carousel-caption">
                            <span>{this.props.content}</span>
                        </div>
                    </a>
                </div>
            );
        } else {
            return (
                <div className="item hellrookie-util-full-size">
                    <a href={this.props.link}>
                        <img src={this.props.img} style={itemProp}/>
                        <div className="carousel-caption">
                            <span>{this.props.content}</span>
                        </div>
                    </a>
                </div>
            );
        }
    }
}