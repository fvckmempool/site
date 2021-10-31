import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/Home';
import Verify from './pages/Verify';
import Mint from './pages/Mint';
import Drinks from './pages/Drinks';

function App() {
return(
  <BrowserRouter>
  <Switch>
    <Route path="/verify/:hash" component={Verify}></Route>
    <Route path="/mint" component={Mint}/>
    <Route path="/drinks" component={Drinks}/>

    <Route path="/" component={Home}/>
  </Switch>
</BrowserRouter>
)
}

export default App;
