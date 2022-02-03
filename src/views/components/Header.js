import React, { useState, useEffect } from 'react';
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
  const [navBG, setNavBG] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (window.pageYOffset >= 100) setNavBG(true);
    else setNavBG(false);

    const onScroll = () => {
      if (window.pageYOffset >= 100) setNavBG(true);
      else setNavBG(false);
    };
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact_form').scrollIntoView();
  };

  const scrollToProduct = () => {
    document.getElementById('product').scrollIntoView();
  };

  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView();
  };

  return (
    <div>
      <NavbarMain
        light
        expand="lg"
        fixed="top"
        color={navBG ? 'white' : 'transparent'}>
        <NavbarLogo href="/">
          <Logo src={mainLogo} alt="Logo" />
        </NavbarLogo>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <NavLinkLeft navbar>
            <NavItem>
              <NaviLink to="#features" onClick={scrollToFeatures}>
                <ButtonLargeText color={colors.textPrimary}>
                  Features
                </ButtonLargeText>
              </NaviLink>
            </NavItem>
            <NavItem>
              <NaviLink to="#product" onClick={scrollToProduct}>
                <ButtonLargeText color={colors.textPrimary}>
                  Product
                </ButtonLargeText>
              </NaviLink>
            </NavItem>
            <NavItem>
              <NaviLink to="/about">
                <ButtonLargeText color={colors.textPrimary}>
                  About
                </ButtonLargeText>
              </NaviLink>
            </NavItem>
            <NavItem>
              <NaviLink to="#contact" onClick={scrollToContact}>
                <ButtonLargeText color={colors.textPrimary}>
                  Contact
                </ButtonLargeText>
              </NaviLink>
            </NavItem>
          </NavLinkLeft>
          <NavLinkRight navbar>
            <NavItem>
              <NaviLink to="/login">
                <ButtonLargeText color={colors.textPrimary}>
                  Login
                </ButtonLargeText>
              </NaviLink>
            </NavItem>
            <NavItem>
              <NaviLink to="/signup" className="signup">
                <NavBtn>
                  <ButtonLargeText color="white">Signup</ButtonLargeText>
                </NavBtn>
              </NaviLink>
            </NavItem>
          </NavLinkRight>
        </Collapse>
      </NavbarMain>
    </div>
  );
};

const Logo = styled.img`
  height: 48px;
  width: auto;
`;

const NavbarLogo = styled(NavbarBrand)`
  padding: 10px 0;
  margin-right: 50px;
`;

const NaviLink = styled(NavLink)`
  margin: 0 30px !important;
  text-decoration: none;
  &.signup {
    margin-left: 15px !important;
    margin-right: 0 !important;
  }

  &:hover {
    opacity: 0.8;
  }

  &.signup:hover {
    opacity: 1;
  }
`;

const NavbarMain = styled(Navbar)`
  padding-top: 0;
  padding-bottom: 0;
  transition: all 0.15s ease-in-out;

  & > .container-fluid {
    width: 100%;
    padding-right: var(--bs-gutter-x, 0.75rem);
    padding-left: var(--bs-gutter-x, 0.75rem);
    margin-right: auto;
    margin-left: auto;

    @media (min-width: 576px) {
      max-width: 540px;
    }
    @media (min-width: 768px) {
      max-width: 720px;
    }
    @media (min-width: 992px) {
      max-width: 960px;
    }
    @media (min-width: 1200px) {
      max-width: 1140px;
    }
    @media (min-width: 1400px) {
      max-width: 1320px;
    }
  }
`;

const NavLinkRight = styled(Nav)`
  height: 100px;
  margin-left: auto;

  & li.nav-item {
    display: flex;
    align-items: center;
  }
`;

const NavLinkLeft = styled(Nav)`
  height: 100px;
  margin-right: auto;

  & li.nav-item {
    display: flex;
    align-items: center;
  }
`;

const NavBtn = styled.div`
  background: ${colors.btnPrimary};
  border-radius: 30px;
  border: none;
  filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.12));
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  padding-left: 30px;
  padding-right: 30px;

  &:hover {
    opacity: 0.86;
  }
`;
