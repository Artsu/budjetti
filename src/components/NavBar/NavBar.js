import React from 'react'
import styled from 'styled-components'


const NavBarContainer = styled.nav`
  margin-bottom: 10px;
`

const NavBarItemIcon = styled.span`
  margin-right: 5px;
`

export default () => (<NavBarContainer className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      <h1 className="title">Budjetti</h1>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-end">
      <a className="navbar-item">
        <NavBarItemIcon className="icon"><i className="fas fa-cogs"/></NavBarItemIcon>
        <div>Asetukset</div>
      </a>
    </div>
  </div>
</NavBarContainer>)
