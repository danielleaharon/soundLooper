import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';


import React, {Fragment} from 'react';
class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
    

      };
      this.getAppContent=this.getAppContent.bind(this);
    

    
    }
   
  
   getAppContent() { 
 
    return (
        
        <div className={''}>

            <Switch>

                <Route path={'/'} exact
                       render={(props) =>
                           <Home {...props}
                          

                                 />} />
                    
                               
            </Switch>
            
        </div>
    );
  }
 render(){
  return (

    <div className='App-background'>

   <Router>
   <div >
     
    <Fragment>
    {this.getAppContent()}
        </Fragment>
        </div>
        {/* <hr className='hr'/> */}
  </Router>

  </div>
  );
  

  }
}
export default App;
