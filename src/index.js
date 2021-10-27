import React from 'react';
import ReactDom from 'react-dom';
import {Router,Switch,Route} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import Pokedex from './Pokedex';
import Pokemon from './Pokemon';

let history = createBrowserHistory();
let App=()=>
{
    return(
        // Instead of using this method we can also use useParams hook to do same action 
          <Router history={history}>
              <Switch>
                  <Route exact path="/" render={(props) => <Pokedex {...props}/>}/>  
                  <Route exact path="/:pokemonId" render={(props) => <Pokemon {...props}/>}/>
                   
                                 
              </Switch>
          </Router>
    )
}
ReactDom.render(<App/>,document.getElementById('root'));



//  
if(module.hot){
    module.hot.accept()
}