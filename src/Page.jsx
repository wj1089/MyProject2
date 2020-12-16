import React from 'react';
import NotFoud from './NotFound'
import { Route,Switch } from 'react-router-dom';

// import Landing from './components/main/Landing.js';
import MenuBar from './components/navigation/MenuBar.js';
import Landing from './components/main/Landing';



// import WidePage from './components/WidePage/WidePage.js';
// import { Slider } from './components/contentCard';
// import ContentCard from './components/contentCard/ContentCard.js';
// import ReviewCard from './components/contentCard/ReviewCard.js';
// import HotTrack from './components/contentCard/HotTrack.js'

const Page = () => (


    <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/MenuBar"component={MenuBar}/>
        <Route component = {NotFoud}/>




        {/* <Route exact path="/WidePage"component={WidePage}/> */}
        {/* <Route exact path="https://play.google.com/store/apps/details?id=com.moriahtown.ismail"/> */}
        {/* <Route exact path="/Slider" component={Slider}/> */}
        {/* <Route exact path="/ContentCard"component={ContentCard}/> */}
        {/* <Route exact path="/ReviewCard" component={ReviewCard}/> */}
        {/* <Route exact path="/HotTrack" component={HotTrack}/> */}
    </Switch>

);



export default Page;