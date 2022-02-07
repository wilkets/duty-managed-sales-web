import React from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import colors from 'config/colors';
import mainLogo from 'assets/images/logo.png';
import fbIcon from 'assets/images/facebook.svg';
import linkedinIcon from 'assets/images/linkedin.svg';
import instaIcon from 'assets/images/instagram.svg';

export default () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Container>
        <FooterTop>
          <Footer1>
            <img src={mainLogo} alt="" />
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium
            </p>
          </Footer1>
          <Footer2>
            <h4>Important Links</h4>
            <a href="/#">Terms &amp; Conditions</a>
            <a href="/#">Privacy Policy</a>
            <a href="/#">FAQ</a>
          </Footer2>
          <Footer3>
            <h4>Contact Us </h4>
            <p>Auckland, New Zealand</p>
            <p>info@dutymanaged.com</p>
            <p>+6326565565</p>
          </Footer3>
          <Footer4>
            <a href="/#">
              <img src={fbIcon} alt="" />
            </a>
            <a href="/#">
              <img src={linkedinIcon} alt="" />
            </a>
            <a href="/#">
              <img src={instaIcon} alt="" />
            </a>
          </Footer4>
        </FooterTop>
      </Container>
      <FooterBottom>
        <Container>
          <FooterText>Copyright {currentYear}</FooterText>
          <FooterText className="right-side">
            Designed by{' '}
            <a href="https://www.orchid.co.nz" target="_blank" rel="noreferrer">
              Orchid
            </a>
          </FooterText>
        </Container>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  background-color: white;
  box-shadow: 3px 1px 57px rgba(0, 0, 0, 0.07);

  & .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 70px;
  padding-bottom: 40px;
  width: 100%;

  @media (max-width: 767px) {
    flex-direction: column;
  }

  & h4 {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    color: ${colors.btnPrimary};
    margin-bottom: 12px;
  }

  & a {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: ${colors.textPrimary};
    display: block;
    margin-bottom: 10px;
    text-decoration: none;

    &:hover {
      color: ${colors.btnPrimary};
    }
  }

  & p {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: ${colors.textPrimary};
    margin-bottom: 10px;
  }
`;

const Footer1 = styled.div`
  width: 40%;

  @media (max-width: 767px) {
    margin-bottom: 10px;
  }

  & img {
    height: 48px;
    width: auto;
  }

  p {
    width: 100%;
    max-width: 242px;
    margin-top: 20px;
    font-weight: 600;
    font-size: 14px;
    line-height: 26px;
    color: ${colors.textPrimary};
  }
`;

const Footer2 = styled.div`
  max-width: 160px;
  margin-top: 15px;
  width: 100%;

  @media (max-width: 767px) {
    margin-bottom: 10px;
  }
`;

const Footer3 = styled.div`
  max-width: 170px;
  margin-top: 15px;
  width: 100%;

  @media (max-width: 767px) {
    margin-bottom: 10px;
  }
`;

const Footer4 = styled.div`
  max-width: 160px;
  margin-top: 15px;
  width: 100%;

  @media (max-width: 767px) {
    margin-bottom: 10px;
  }

  & a {
    display: inline;
    margin-right: 10px;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const FooterBottom = styled.div`
  height: 70px;
`;

const FooterText = styled.p`
  font-size: 12px;
  letter-spacing: 0.5px;
  font-weight: 600;
  line-height: 16px;
  margin: 0;
  color: ${colors.textPrimary};

  & a {
    font-weight: 600;
    color: ${colors.textPrimary};
    text-decoration: none !important;

    &:hover {
      color: ${colors.btnPrimary};
    }
  }
`;
