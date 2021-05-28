import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './Pages/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Details from './Pages/Details/Details';
import About from './Pages/About/About';
import Signin from './Pages/Signin/Signin';
import PanelRoutes from './Pages/Panel/PanelRoutes';
import NotFound from './Pages/NotFound/NotFound';
import MercadoPago from './Components/MercadoPago/MercadoPago';
import CreatePostContext from './Pages/NewPost/Contexts/CreatePostContext';
import ProgressBar from './Pages/NewPost/ProgressBar';
import ProtectedRoute from './Components/Auth0/ProtectedRoute/ProtectedRoute';
import Successful from './Pages/Successful/Successful'
import Render from './Components/GoogleMaps/FormMap';

export default function MyHouseRoutes() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/maps" component={Render}/>
          <Route path="/home" component={Home} />
          <Route
            exact path="/post/:id"
            render={(routerPops) => <Details routerProps={routerPops} />}
          />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <ProtectedRoute
            exact path='/create'
            component={(routerProps) => (
             <CreatePostContext {...routerProps}>
                <ProgressBar />
              </CreatePostContext>
            )}
          />
          <Route
            exact path="/about"
            component={About}
          />
          <Route
            exact path="/signin"
            component={Signin}
          />
          <Route
            path="/panel"
            component={PanelRoutes}
          />
          <ProtectedRoute
            exact path="/Success/:planId/:planTitle"
            component={Successful}
          />
          <Route
            component={NotFound}
            />
          {/* <Footer/> */}
        </Switch>
      </div>
    </Router>
  );
}
