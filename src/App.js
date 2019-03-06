import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import Signin from './components/signIn/Signin';
import Register from './components/register/Register';
import './App.css';

const app = new Clarifai.App({
 apiKey: '4012525a32084ffda4987e16ef302a84'
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component{
constructor(){
  super();
  this.state = {
    input: '',
    imageUrl: '',
    box:{},
    route: 'signin',
    isSignedIn: false
  }
}

calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  this.setState({box: box});
}

onInputChange = (event) =>{
  this.setState({input: event.target.value});
}


onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.id
          })
        })


      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
}

onRouteChange = (route) => {
  if(route === 'signout'){
    this.setState({isSignedIn: false})
  }else if(route === 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route: route})
}

  render() {
    const {isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
          />
        <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange}/>
        { route ==='home'
        ?  <div>
           <Logo />
           <Rank />
           <ImageLinkForm
             onInputChange={this.onInputChange}
             onButtonSubmit={this.onButtonSubmit}
           />
           <FaceRecognition box={box} imageUrl={imageUrl} />
           </div>
        : (
          route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
          )
        }

      </div>
    );
  }
}

export default App;
