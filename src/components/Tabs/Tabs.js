import React from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import classnames from 'classnames'

export default withRouter((props) => {
  return <div className="tabs">
    <ul>
      <li className={classnames({'is-active': props.history.location.pathname === '/'})}><Link to="/">Tulot ja menot</Link></li>
      <li className={classnames({'is-active': props.history.location.pathname === '/budget'})}><Link to="/budget">Budjetointi</Link></li>
      <li className={classnames({'is-active': props.history.location.pathname === '/credit'})}><Link to="/credit">Luottokortit</Link></li>
    </ul>
  </div>
})