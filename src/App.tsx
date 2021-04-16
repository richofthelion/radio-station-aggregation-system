import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';

// Pages
import HomePage from 'components/page/HomePage';
import StationPage from 'components/page/StationPage';

// Providers
import { StationsProvider } from 'providers/stations-provider/StationsProvider';

export default function App() {
  return (
    <StationsProvider>
      <Router>
        <Switch>
          <Route exact path="/radio/home">
            <HomePage />
          </Route>
          <Route exact path="/radio/:id" children={<StationPage />} />
          <Route path="/*">
            <Redirect to="/radio/home" />
          </Route>
        </Switch>
      </Router>
    </StationsProvider>
  );
}
