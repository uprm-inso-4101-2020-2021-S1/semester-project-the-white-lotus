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
}

export default App;
