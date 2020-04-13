import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { store, persistor } from './redux/store';
import Dashboard from './components/main/home/Dashboard';
import PrivateRoute from './components/private/PrivateRoute';
import Navbar from './components/layouts/Navbar';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Navbar />
          <div className="App container">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/sign-in' component={Login} />
              <Route path='/sign-up' component={Register} />
              <PrivateRoute path='/dashboard' component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
