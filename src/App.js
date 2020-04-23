import React, { Component } from 'react';
import Particles from 'react-particles-js';
import SignInForm from './Components/SignIn/SignInForm';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import Register from './Components/Registration/Register';
import ImageLinkForm from './Components/LinkForm/ImageLinkForm';
import FaceRecognition from './Components/FacialRecognition/FaceRecognition';
import './App.css';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '5ff79fe5a8f440dcba89366a08592b11'
});

const particleOptions = {
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box:{},
      route: 'SignInForm'
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    console.log('Event called!', event.target.value);
  }

  onRouteChange = (route) => {
    this.setState({route:route});
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    console.log('Clicked!');
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(
        function (response) {
          console.log('Response!', response)
        },
        function (err) {
          console.log('Error!', err)
        }
      );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' 
        params={particleOptions} 
        />
        <Navigation onRouteChange={this.onRouteChange}/>
        {this.state.route === 'SignInForm'
        ?<SignInForm onRouteChange={this.onRouteChange}/>
          :<div>
            <Logo/>
            <Rank/>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition imageUrl={this.state.imageUrl} />
          </div>
        }
      </div>
    );
  }
}

export default App;
