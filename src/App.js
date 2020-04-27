import React, { Component } from 'react';
// import HomePage from './HomePage';
import Particles from 'react-particles-js';
import SignInForm from './Components/SignIn/SignInForm';
import Navigation from './Components/Navigation/Navigation';
import Rank from './Components/Rank/Rank';
import Register from './Components/Registration/Register';
import ImageLinkForm from './Components/LinkForm/ImageLinkForm';
import FaceRecognition from './Components/FacialRecognition/FaceRecognition';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
      box: {},
      route: 'SignInForm'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.boundingg_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  faceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    console.log('Event called!', event.target.value);
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    console.log('Clicked!');
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.faceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log('Error!', err));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Particles className='particles'
            params={particleOptions}
          />

          <Navigation />
          <Switch>
            <Route exact path="/" component={SignInForm} />
            <Route path="/rank" component={Rank} />
            <Route path="/register" component={Register} />
            <Route path="/Linkform" component={ImageLinkForm} />
            <Route path="/facialRecognition" component={FaceRecognition} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
