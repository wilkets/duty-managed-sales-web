import React from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import colors from 'config/colors';

export default () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Container>
        <FooterText>
          &copy;{currentYear} VIRTUAL FREIGHT TECHNOLOGIES. all rights reserved.
          web app development by{' '}
          <a href="https://www.orchid.co.nz/" target="_blank" rel="noreferrer">
            orchid
          </a>
          .
        </FooterText>
        <FooterText className="right-side">
          <a href="/#contact_form">Contact</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms-conditions">Terms &amp; Conditions</a>
        </FooterText>
      </Container>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  background-color: white;
  height: 50px;

  & .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
`;

const FooterText = styled.p`
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 16px;
  margin: 0;
  color: ${colors.textSecondary};

  & a {
    color: ${colors.infoMain};
    text-decoration: none !important;

    &:hover {
      border-bottom: 1px solid;
    }
  }

  &.right-side {
    & a {
      margin: 0 12px;
    }
  }
`;
