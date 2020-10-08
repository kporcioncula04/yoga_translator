import React, { Component } from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import Home from './Home'
import AllPoses from './AllPoses'

export default class navbar extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/allPoses'>All Poses</Link>
          </li>
        </ul>

        <Switch>
          <Route exact={true} path='/' component={Home}/>
          <Route path='/allPoses' component={AllPoses}/>
        </Switch>
      </div>
    )
  }
}
