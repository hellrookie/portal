import ReactDOM from 'react-dom'
import React from 'react'
import TopNavigation from './components/nav/topNav.jsx'
import Slider from '../hellrookie.util/slider/slider.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Img1 from './images/1.jpg'
import Img2 from './images/2.jpg'
import Img3 from './images/3.jpg'

let items = [
    {
        link: "http://www.bing.com",
        content: "单行注释跟JavaScript语言中的注释一样，使用又斜杠（ //），但单行注释不会输入到CSS中。",
        img: Img1
    },
    {
        link: "http://www.google.com",
        content: "N. Korean defector at State of Union touts Trump",
        img: Img2
    },
    {
        link: "http://www.baidu.com",
        content: "FBI Director Chris Wray offered new details on Tuesday that directly contradict the White House’s account of the timeline leading to former White House staff secretary Rob Porter’s departure following allegations of domestic abuse from two of his ex-wives.",
        img: Img3
    },
    {
        link: "http://www.bing.com",
        content: "The timeline laid out in Wray’s testimony before Congress sharply departs from the narrative offered by the White House last week.",
        img: Img2
    },
]

ReactDOM.render(
    <div>
        <TopNavigation>
        </TopNavigation>
        <div className="container" style={{height:'300px', width:'400px', padding:'0', borderRadius:'20px'}}>
            <Slider items={items}/>
        </div>
    </div>,
    document.getElementById('root')
);