import ReactDOM from 'react-dom'
import React from 'react'
import TopNavigation from './components/nav/topNav.jsx'
import Slider from '../hellrookie.util/slider/slider.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

/*let app = express();
app.post('../resource/config.json', function(req, res){
    fs.readfile
})*/
let items = []

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