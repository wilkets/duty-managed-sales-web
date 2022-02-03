import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import colors from 'config/colors';
import { Container, Row, Col } from 'reactstrap';
import { testimonies } from 'config/constants';
import heroBG from 'assets/images/bg.png';
import heroImg from 'assets/images/hero-img.png';
import serviceImg1 from 'assets/images/service1.png';
import serviceImg2 from 'assets/images/service2.png';
import serviceImg3 from 'assets/images/service3.png';
import featuresBG from 'assets/images/feature-bg.png';
import featureImg from 'assets/images/feature-img.png';
import star from 'assets/images/star.png';
import freetrialBG from 'assets/images/freetrial-bg.png';
import contactBG from 'assets/images/contact-bg.png';
import Swal from 'sweetalert2';
import Header from './components/Header';
import Footer from './components/Footer';

emailjs.init('user_b2xRxLSUW6uT0UYDtFmIA');

export default () => {
  const [testiSelected, setTestiSelected] = useState(testimonies[0]);
  const defaultContact = {
    name: '',
    email: '',
    message: '',
  };
  const [contactInfo, setContactInfo] = useState(defaultContact);
  const [loading, setLoading] = useState(false);

  const onInputContactForm = (e) => {
    const { value, id } = e.target;
    setContactInfo({ ...contactInfo, [id]: value });
  };

  const validateEmail = (email) =>
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  const showError = (msg) => {
    Swal.fire({
      title: 'Error!',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Go Back',
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
      customClass: {
        confirmButton: 'btn-custom',
      },
    }).then(() => setLoading(false));
  };

  const showSuccess = (msg) => {
    Swal.fire({
      title: 'Success!',
      text: msg,
      icon: 'success',
      confirmButtonText: 'Go Back',
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
      customClass: {
        confirmButton: 'btn-custom',
      },
    }).then(() => {
      setLoading(false);
    });
  };

  const submitContactForm = async () => {
    setLoading(true);

    if (!validateEmail(contactInfo.email) || !contactInfo.name) {
      if (!contactInfo.name) {
        showError('Please enter your name.');
      } else {
        showError('Please enter a valid email address.');
      }
    } else {
      try {
        const res = await emailjs.send(
          'gmail_service',
          'contact_form',
          contactInfo
        );
        if (res) {
          showSuccess(
            'Thank you for your inquiry!\nWe will get back to you as soon as possible.'
          );
        } else {
          showError(
            'An error occured.\nPlease check your internet connection.'
          );
        }
      } catch (e) {
        showError('An error occured.\nPlease check your internet connection.');
      }
    }
  };

  return (
    <div>
      <Header />
      <HeroContainer>
        <HeroSection>
          <TaglineContainer>
            <MainTag>Lorem ipsum dolor sit</MainTag>
            <SubTag>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam
            </SubTag>
            <MainBtn>Start your free trial</MainBtn>
          </TaglineContainer>
          <HeroIMG src={heroImg} alt="Hero img" />
        </HeroSection>
      </HeroContainer>

      <Container id="features">
        <ServiceSection>
          <TagHeading>Benefits</TagHeading>
          <ServiceHeading>Lorem ipsum dolor sit</ServiceHeading>
          <ServiceDesc>
            <SubTag>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam
            </SubTag>
          </ServiceDesc>
          <Row>
            <Col md="4">
              <ServiceItem>
                <ServiceImg src={serviceImg1} alt="" />
                <ServiceTitle>Service # 1</ServiceTitle>
                <ServiceItemDesc>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusa
                </ServiceItemDesc>
              </ServiceItem>
            </Col>
            <Col md="4">
              <ServiceItem>
                <ServiceImg src={serviceImg2} alt="" />
                <ServiceTitle>Service # 2</ServiceTitle>
                <ServiceItemDesc>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusa
                </ServiceItemDesc>
              </ServiceItem>
            </Col>
            <Col md="4">
              <ServiceItem>
                <ServiceImg src={serviceImg3} alt="" />
                <ServiceTitle>Service # 3</ServiceTitle>
                <ServiceItemDesc>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusa
                </ServiceItemDesc>
              </ServiceItem>
            </Col>
          </Row>
        </ServiceSection>
      </Container>

      <FeaturesSection id="product">
        <Container>
          <FeaturesRow>
            <FeatureCol1>
              <FeatureTitle>Lorem ipsum dolor sit </FeatureTitle>
              <SubTag>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam
              </SubTag>
              <FeatList>
                <FeatHeading>Title # 1</FeatHeading>
                <FeatDesc>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium
                </FeatDesc>
                <FeatHeading>Title # 2</FeatHeading>
                <FeatDesc>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium
                </FeatDesc>
              </FeatList>
            </FeatureCol1>
            <FeatureCol2>
              <img src={featureImg} alt="" />
            </FeatureCol2>
          </FeaturesRow>
        </Container>
      </FeaturesSection>

      <TestimonialSection>
        <Container>
          <TagHeading>Testimonials</TagHeading>
          <TestiContainer>
            <TestiPeople>
              {testimonies.map((item) => (
                <Testimony
                  key={item.id}
                  className={testiSelected.id === item.id ? 'active' : ''}
                  onClick={() => setTestiSelected(item)}>
                  <img src={item.icon} alt="" />
                  <div>
                    <TestiTitle>{item.name}</TestiTitle>
                    <TestiCompany>{item.company}</TestiCompany>
                  </div>
                </Testimony>
              ))}
            </TestiPeople>
            <TestimonialFull>
              <h4>{testiSelected.title}</h4>
              {[...Array(testiSelected.stars)].map((x, i) => (
                <img src={star} key={i} alt="" />
              ))}
              <p>{testiSelected.fullDesc}</p>
            </TestimonialFull>
          </TestiContainer>
        </Container>
      </TestimonialSection>

      <Container>
        <FreeTrialSection>
          <FreeTrialCol1>
            <h2>Sed ut perspiciatis unde omnis</h2>
            <SubTag>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam
            </SubTag>
          </FreeTrialCol1>
          <MainBtn>Start your free trial</MainBtn>
        </FreeTrialSection>
      </Container>

      <ContactSection id="contact_form">
        <ContactContainer>
          <ContactInner>
            <TagHeading>Enquire</TagHeading>
            <h5>Have new question?</h5>
            <FormRow>
              <FormCol>
                <InputContainer>
                  <input
                    type="text"
                    id="name"
                    autoComplete="no"
                    placeholder="Name"
                    value={contactInfo.name}
                    disabled={loading}
                    onChange={(e) => onInputContactForm(e)}
                  />
                </InputContainer>
                <InputContainer>
                  <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    value={contactInfo.email}
                    disabled={loading}
                    onChange={(e) => onInputContactForm(e)}
                  />
                </InputContainer>
                <InputContainer>
                  <textarea
                    id="message"
                    autoComplete="none"
                    placeholder="Your Enquiry"
                    value={contactInfo.message}
                    disabled={loading}
                    onChange={(e) => onInputContactForm(e)}
                  />
                </InputContainer>
              </FormCol>
            </FormRow>
            <ContactBtnContainer>
              <MainBtn onClick={submitContactForm} disabled={loading}>
                Contact
              </MainBtn>
            </ContactBtnContainer>
          </ContactInner>
        </ContactContainer>
      </ContactSection>
      <Footer />
    </div>
  );
};

const HeroContainer = styled.div`
  background-image: url(${heroBG});
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
  padding-top: 40px;
`;

const HeroSection = styled(Container)`
  width: 100%;
  min-height: 840px;
  display: flex;
  align-items: center;

  @media (max-width: 1200px) {
    min-height: 760px;
  }

  @media (max-width: 991px) {
    flex-direction: column;
    height: auto;
    text-align: center;
  }
`;

const TaglineContainer = styled.div`
  max-width: 418px;
  height: 100%;

  @media (max-width: 991px) {
    max-width: unset;
    margin-top: 100px;
  }
`;

const HeroIMG = styled.img`
  width: auto;
  margin-left: auto;

  @media (max-width: 1399px) {
    max-width: 740px;
    position: relative;
    right: -50px;
  }

  @media (max-width: 1200px) {
    max-width: 640px;
    top: -40px;
    width: 100%;
  }

  @media (max-width: 991px) {
    max-width: unset;
    top: 0;
    right: 0;
    margin-top: 70px;
  }
`;

const MainTag = styled.h1`
  font-weight: bold;
  font-size: 76px;
  line-height: 111.68%;
  color: ${colors.btnPrimary};
  width: 100%;

  @media (max-width: 991px) {
    font-size: 50px;
    line-height: 65px;
  }
`;

const SubTag = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  margin-top: 25px;
  margin-bottom: 30px;
  color: ${colors.textPrimary};
  width: 100%;
`;

const MainBtn = styled.button`
  border: none;
  background: ${colors.btnOrange};
  height: 53px;
  border-radius: 42px;
  font-family: 'Open Sans', sans-serif;
  color: white;
  font-weight: 600;
  font-size: 22px;
  line-height: 35px;
  padding: 0 37px;

  &:hover {
    opacity: 0.86;
  }

  &:disabled {
    opacity: 0.86;
    cursor: progress;
  }
`;

const ServiceSection = styled.div`
  margin: auto;
  text-align: center;
  padding-top: 60px;

  img {
    pointer-events: none;
  }
`;

const ContactSection = styled.div`
  background-color: white;
  background-image: url(${contactBG});
  margin-top: 60px;
  padding-top: 100px;
  padding-bottom: 80px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
`;

const ContactContainer = styled.div`
  background-color: white;
  box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.09);
  border-radius: 27px;
  max-width: 880px;
  margin: auto;
  width: 100%;
  padding: 80px 15px 65px;
`;

const ContactInner = styled.div`
  max-width: 720px;
  margin: auto;
  width: 100%;
  text-align: center;

  & h5 {
    color: ${colors.btnPrimary};
    margin-bottom: 40px;
    font-size: 30px;
    line-height: 40px;
  }
`;

const FormRow = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ContactBtnContainer = styled.div`
  margin-bottom: 10px;

  & > button {
    padding: 0 50px;
    height: 44px;
    font-size: 18px;
  }
`;

const FormCol = styled.div`
  width: 100%;
  max-width: 540px;
  margin: auto;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 25px;

  & input,
  & textarea {
    width: 100%;
    background: #f8f8f8;
    border-radius: 6px;
    box-shadow: none !important;
    outline: none !important;
    border: none;
    color: ${colors.btnPrimary};
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 0.15px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    padding: 12px 20px;

    &::placeholder {
      color: ${colors.textPrimary};
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: ${colors.textPrimary};
      box-shadow: 0 0 0px 1000px #f8f8f8 inset;
      transition: background-color 5000s ease-in-out 0s;
    }
  }

  & textarea {
    height: 113px;
    resize: none;
    line-height: 20px;
  }
`;

const TagHeading = styled.div`
  display: table;
  color: ${colors.textOrange};
  border: 2px solid ${colors.textOrange};
  border-radius: 42px;
  padding: 0 20px;
  height: 37px;
  font-size: 16px;
  font-weight: 600;
  line-height: 33px;
  background: transparent;
  text-align: center;
  margin: auto;
  margin-bottom: 25px;
`;

const ServiceHeading = styled.h3`
  color: ${colors.btnPrimary};
  max-width: 370px;
  margin: auto;

  @media (max-width: 767px) {
    font-size: 34px;
    line-height: 44px;
  }
`;

const ServiceDesc = styled.div`
  max-width: 648px;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 60px;
`;

const ServiceItem = styled.div`
  box-shadow: 3px 17px 57px rgba(0, 0, 0, 0.08);
  border-radius: 23px;
  max-width: 350px;
  padding: 60px 30px;
  text-align: left;
  position: relative;
  margin: 50px auto;
`;

const ServiceTitle = styled.div`
  color: ${colors.btnPrimary};
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 22px;
  line-height: 177.18%;
`;

const ServiceItemDesc = styled.div`
  color: ${colors.textPrimary};
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  max-width: 275px;
`;

const ServiceImg = styled.img`
  height: 60px;
  width: 60px;
  position: absolute;
  top: -30px;
`;

const FeatureTitle = styled.h3`
  color: ${colors.btnPrimary};
  max-width: 370px;

  @media (max-width: 991px) {
    max-width: unset;
  }

  @media (max-width: 767px) {
    font-size: 34px;
    line-height: 44px;
  }
`;

const FeaturesRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  @media (max-width: 991px) {
    flex-direction: column;
    margin-top: 100px;
  }
`;

const FeatureCol1 = styled.div`
  max-width: 432px;
  top: -25px;
  position: relative;

  @media (max-width: 991px) {
    max-width: unset;
  }
`;

const FeatureCol2 = styled.div`
  margin: auto;
  margin-top: 150px;
  margin-right: -20px;

  @media (max-width: 991px) {
    margin-top: 30px;
    margin-right: 0;

    & img {
      width: 100%;
      position: relative;
      top: -30px;
    }
  }
`;

const FeaturesSection = styled.div`
  background-image: url(${featuresBG});
  background-size: auto 350px;
  background-repeat: no-repeat;
  background-position: center right;

  @media (max-width: 991px) {
    background-position: bottom right;
  }
`;

const FeatHeading = styled.div`
  color: ${colors.btnPrimary};
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 22px;
  line-height: 177.18%;
`;

const FeatList = styled.div`
  margin-left: 50px;
`;

const FeatDesc = styled.div`
  color: ${colors.textPrimary};
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  max-width: 275px;
  margin-bottom: 20px;
`;

const TestimonialSection = styled.div`
  padding-top: 100px;
`;

const TestiContainer = styled.div`
  display: flex;
  margin-top: 50px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const TestiPeople = styled.div`
  max-width: 360px;
  width: 100%;

  @media (max-width: 767px) {
    max-width: 400px;
    margin: auto;
    margin-top: 30px;
  }
`;

const Testimony = styled.div`
  transition: all 0.15s ease-in-out;
  padding: 30px 40px;
  border-radius: 23px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    box-shadow: 3px 17px 57px rgba(0, 0, 0, 0.04);
  }

  &.active {
    box-shadow: 3px 17px 57px rgba(0, 0, 0, 0.08);
  }

  & > img {
    width: 65px;
    height: 65px;
    margin-right: 20px;
  }
`;

const TestiTitle = styled.div`
  font-weight: 600;
  font-size: 22px;
  line-height: 34px;
  color: ${colors.btnPrimary};
`;

const TestiCompany = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 26px;
  color: ${colors.textPrimary};
`;

const TestimonialFull = styled.div`
  animation: fadeIn 0.6s;
  width: 100%;
  margin-left: 60px;
  margin-top: 20px;

  @media (max-width: 767px) {
    margin-left: 0;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  & h4 {
    font-weight: bold;
    font-size: 30px;
    line-height: 40px;
    color: ${colors.btnPrimary};
    margin-bottom: 10px;
  }

  & img {
    margin-right: 4px;
  }

  & p {
    font-weight: 600;
    font-size: 14px;
    line-height: 26px;
    color: ${colors.textPrimary};
    margin-top: 30px;
    white-space: break-spaces;
  }
`;

const FreeTrialSection = styled.div`
  background-image: url(${freetrialBG});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 50px;
  min-height: 470px;

  @media (max-width: 991px) {
    background-size: cover;
    flex-direction: column;
    justify-content: center;
    margin-top: 40px;
  }

  & button {
    position: relative;
    top: 50px;
    right: 50px;

    @media (max-width: 1200px) {
      top: 50px;
      right: 0;
    }

    @media (max-width: 991px) {
      top: 0;
      right: unset;
    }
  }
`;

const FreeTrialCol1 = styled.div`
  max-width: 500px;

  @media (max-width: 991px) {
    margin-top: 10px;
  }

  & h2 {
    font-weight: 600;
    font-size: 46px;
    line-height: 56px;
    margin-top: 20px;
    margin-bottom: 10px;

    @media (max-width: 991px) {
      font-size: 34px;
      line-height: 44px;
      margin-top: 10px;
    }
  }
`;
