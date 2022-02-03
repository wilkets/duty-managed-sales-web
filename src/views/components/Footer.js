import React from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import colors from 'config/colors';
import mainLogo from 'assets/images/logo.png';

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
          <Footer2>Sample</Footer2>
          <Footer3>Sample</Footer3>
          <Footer4>Sample</Footer4>
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
`;

const Footer1 = styled.div`
  width: 40%;

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
  width: 100%;
`;

const Footer3 = styled.div`
  max-width: 150px;
  width: 100%;
`;

const Footer4 = styled.div`
  max-width: 160px;
  width: 100%;
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
