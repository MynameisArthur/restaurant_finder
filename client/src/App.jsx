import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import {RestaurantContextProvider} from './context/RestaurantContext';

import './App.css';

function App() {
    return (
        <RestaurantContextProvider>
            <div className='container'>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route
                            exact
                            path='/restaurants/:id/update'
                            component={UpdatePage}
                        />
                        <Route
                            exact
                            path='/restaurants/:id'
                            component={RestaurantDetailPage}
                        />
                    </Switch>
                </Router>
            </div>
        </RestaurantContextProvider>
    );
}

export default App;
