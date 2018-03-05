import React, {Component} from 'react'
import SliderItem from './sliderItem.jsx'
import './slider.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.items = [];
        this.buttons = [];
        this.assembleItems();
    }

    assembleItems() {
        for (let i = 0; i < this.props.items.length; ++i) {
            if(i == 0) {
                this.items.push(<SliderItem link={this.props.items[i].link} content={this.props.items[i].content} img={this.props.items[i].img} key={i} isActive={true}/>);
                this.buttons.push(<li data-target="#slider" data-slide-to={i} key={i} className="active"/>);
            }else{
                this.items.push(<SliderItem link={this.props.items[i].link} content={this.props.items[i].content} img={this.props.items[i].img} key={i} isActive={false}/>);
                this.buttons.push('\u0020');
                this.buttons.push(<li data-target="#slider" data-slide-to={i} key={i}/>);
            }
        }
    }

    render() {
        return (
            <div className="hellrookie-util-full-size">
                <section  id="slider" className="carousel slide hellrookie-util-full-size" data-ride="carousel">
                    <ol className="carousel-indicators" style={{bottom:'10px'}}>
                        {this.buttons}
                    </ol>
                    <div className="carousel-inner hellrookie-util-full-size">
                        {this.items}
                    </div>
                    <a className="carousel-control left hellrookie-util-slider-arrow-radius-left" href="#slider" role="button" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"/>
                    </a>
                    <a className="carousel-control right hellrookie-util-slider-arrow-radius-right" href="#slider" role="button" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"/>
                    </a>
                </section >
            </div>
        );
    }
}