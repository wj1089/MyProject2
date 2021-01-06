import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/main/Landing';

const Page = () => (
    <Switch>
        <Route exact path="/" component={Landing}/>
    </Switch>
);

export default Page;