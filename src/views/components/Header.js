import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import mainLogo from 'assets/images/logo.png';
import styled from 'styled-components';
import { ButtonLargeText } from 'config/typography';
import colors from 'config/colors';

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <NavbarMain color="white" light expand="md">
        <NavbarLogo href="/">
          <Logo src={mainLogo} alt="Logo" />
        </NavbarLogo>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <NavLinkContainer navbar>
            <NavItem>
              <NaviLink to="/">
                <ButtonLargeText color={colors.textSecondary}>
                  Home
                </ButtonLargeText>
              </NaviLink>
            </NavItem>
            <NavItem>
              <NaviLink to="/about">
                <ButtonLargeText color={colors.textSecondary}>
                  About
                </ButtonLargeText>
              </NaviLink>
            </NavItem>
            <NavItem>
              <NaviLink to="/get-started">
                <ButtonLargeText color={colors.textSecondary}>
                  Get Started
                </ButtonLargeText>
              </NaviLink>
            </NavItem>
            <NavItem>
              <NaviLink to="/login">
                <ButtonLargeText color={colors.textSecondary}>
                  Login
                </ButtonLargeText>
              </NaviLink>
            </NavItem>
          </NavLinkContainer>
        </Collapse>
      </NavbarMain>
    </div>
  );
};

const Logo = styled.img`
  height: 50px;
  width: auto;
`;

const NavbarLogo = styled(NavbarBrand)`
  padding: 10px 0;
`;

const NaviLink = styled(NavLink)`
  padding: 0 35px !important;
  text-decoration: none;

  &.active {
    color: ${colors.primary};
    border-bottom: 2px solid ${colors.primary};
    background-color: ${colors.grey100};
  }

  &.active > div {
    color: ${colors.primary};
  }

  &:hover {
    background-color: ${colors.grey100};
  }
`;

const NavbarMain = styled(Navbar)`
  padding-top: 0;
  padding-bottom: 0;
`;

const NavLinkContainer = styled(Nav)`
  height: 80px;
  margin-left: auto;

  & a {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;
