import React from 'react';
<<<<<<< HEAD
import logo from './logo.svg';
import Header from './components/header/Header.js'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Header ></Header>
    </div>
  );
=======
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import forYouPage from './pages/forYouPage';
import landingPage from './pages/landingPage';
import Error from './pages/errorPage';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={landingPage} exact/>
            <Route path="/foryou" component={forYouPage}/>
            <Route component={Error}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
>>>>>>> c985b497f3b35c2b52ad4f4f80ee2ba381bc1d6b
}

export default App;
