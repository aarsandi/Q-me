import React from 'react';
import './scss/index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './views/Home'
import ListDoctor from './views/ListDoctor'
import Login from './views/Login'
import Register from './views/Register'
import AdminRegister from './views/AdminRegister'
import PatientDashboard from './views/patient/Dashboard'
import EditProfile from './views/patient/EditProfile'

import AdminDashboard from './views/admin/Dashboard'
import Controller from './views/admin/Controller'
import Appointment from './views/admin/Appointment'
import Doctor from './views/admin/Doctor'
import Monitor from './views/admin/Monitor'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/admin/controller/:id">
            <Controller/>
          </Route>
          <Route exact path="/admin/monitor/:id">
            <Monitor/>
          </Route>
          <Route exact path="/admin/appointment/:id">
            <Appointment/>
          </Route>
          <Route exact path="/admin/doctor">
            <Doctor/>
          </Route>
          <Route exact path="/admin/register">
            <AdminRegister/>
          </Route>
          <Route exact path="/admin">
            <AdminDashboard/>
          </Route>
          <Route exact path="/patient">
            <PatientDashboard/>
          </Route>
          <Route exact path="/patient/edit">
            <EditProfile/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/doctors">
            <ListDoctor/>
          </Route>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="*">
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
