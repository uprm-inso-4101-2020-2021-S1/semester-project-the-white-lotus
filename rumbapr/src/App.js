import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import forYouPage from './pages/forYouPage';
import landingPage from './pages/landingPage';
import placeCatalog from './pages/placeCatalog';
import contact from './pages/contact';
import about from './pages/about';
import registerPage from './pages/OLDregisterPage';
import loginPage from './pages/loginPage';
import Error from './pages/errorPage';
import SearchResultsPage from "./pages/SearchResultsPage";


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={landingPage} exact/>
            <Route path="/foryou" component={forYouPage}/>
            <Route path="/about" component={about} exact />
            <Route path="/contact" component={contact} exact />
            <Route path="/places" component={placeCatalog} exact />
            <Route path="/register" component={registerPage} exact />
            <Route path="/login" component={loginPage} exact />
            <Route path="/results" component={SearchResultsPage} exact/>
            <Route component={Error}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
