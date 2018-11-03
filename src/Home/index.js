import React from 'react';

import { Switch, Route } from 'react-router-dom';

import HomeView from './HomeView';

function Home() {
  return (
    <Switch>
      <Route exact path="/home" component={HomeView} />
    </Switch>
  );
}

export default Home;
