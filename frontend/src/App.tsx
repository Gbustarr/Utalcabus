import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AutentiacionAdministrador from './pages/AutenticacionAdministrador';
import ListadoBuses from './pages/ListadoBuses';
import RegistroBus from './pages/RegistroBus';
import TemporalRouter from './pages/TemporalRouter';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={TemporalRouter} />
        <Route path="/authentication" component={AutentiacionAdministrador} />
        <Route path="/bus-list" component={ListadoBuses} />
        <Route path="/bus-registration" component={RegistroBus} />
      </Switch>
    </Router>
  );
};

export default App;
