import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Popper from 'popper.js'

class App extends Component {
    render() { 
		console.log(this.props);
        return (  
           <React.Fragment >
            <div className="container-fluid mt-5 pt-5">
		        <div className="row">
			<div className="container" style={{textAlign:"center"}}>
				<div className="col-xs-12">
					<h1 className="display-2">
						1+
					</h1>
					<h1 className="display-4">
						Pre-Built Website Templates
					</h1>
					<h6 className="mt-4">
						MINIMALISTIC, CREATIVE AND DARK STYLES
					</h6>
				</div>
			</div>
		</div>
		<div className="container mt-5 pt-4 d-flex">
			<ul className="list-group mx-auto justify-content-center list-group-horizontal">
				<li className="list-group-item">ALL</li>
				<li className="list-group-item">AGENCY</li>
				<li className="list-group-item">PORTFOLIO</li>
				<li className="list-group-item">PHOTOGRAPHY</li>
				<li className="list-group-item">ONE PAGE</li>
				<li className="list-group-item">SHOP</li>
				</ul>
		</div>
		<div id="pagegrid" className="container-fluid mt-5 pt-5" style={{backgroundImage:"https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-classic-agency.jpg"}}>
			<div className="row">
			<div className="mt-5 col-lg-4 col-md-6 col-sm-12">
					<img src="https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-carousel-portfolio.jpg" className="img-fluid" alt=""></img><br></br>
					<span>Minimal PHOTOGRAPHY</span>
				</div>
				<div className="mt-5 col-lg-4 col-md-6 col-sm-12">
					<img src="https://i.pinimg.com/originals/71/36/69/713669080a3eff059c320c925250f6f1.jpg" className="img-fluid" alt=""></img><br></br>
					<span>An elephant with no purpose</span>
				</div>
				<div className="mt-5 col-lg-4 col-md-6 col-sm-12">
					<img src="https://html.nkdev.info/skylith/assets/images/screenshot-demo-dark-fullscreen-slider.jpg" className="img-fluid"   alt=""></img><br></br>
					<span>MADLAD GOES BRRR</span>
				</div>
				<div className="mt-5 col-lg-4 col-md-6 col-sm-12">
					<img src="https://html.nkdev.info/skylith/assets/images/screenshot-demo-minimal-classic-agency.jpg" className="img-fluid"  alt=""></img>
					<br></br>
					<span>Promo One page</span>
	
				</div>
				<div className="mt-5 col-lg-4 col-md-6 col-sm-12">
					<img src="https://html.nkdev.info/skylith/assets/images/screenshot-demo-dark-creative-agency.jpg" className="img-fluid" alt=""></img>
					<br></br>
					<span>Classic Agency</span>

				</div>
			
			</div>
		</div>
	</div>
           </React.Fragment>
        );
    }
}
 
export default App;