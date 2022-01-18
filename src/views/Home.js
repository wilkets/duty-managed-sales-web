import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import colors from 'config/colors';
import { ButtonLargeText, Subtitle, Body2, Body3 } from 'config/typography';
import { Container } from 'reactstrap';
import { features, faqs } from 'config/constants';
import mapImg from 'assets/images/map.png';
import heroBG from 'assets/images/herobg.jpeg';
import aboutImg from 'assets/images/about_img.png';
import appScreenShot from 'assets/images/app_screenshot.png';
import settingsImg from 'assets/images/settings_img.png';
import checkIcon from 'assets/images/check.png';
import benefitsImg from 'assets/images/benefits.png';
import membershipImg from 'assets/images/membership.png';
import minusIcon from 'assets/images/minus.png';
import plusIcon from 'assets/images/plus.png';
import footerBG from 'assets/images/footerbg.png';
import { cloneDeep } from 'lodash';
import Swal from 'sweetalert2';
import Header from './components/Header';
import Footer from './components/Footer';

emailjs.init('user_b2xRxLSUW6uT0UYDtFmIA');

export default () => {
  const [featureSelected, setFeatureSelected] = useState();
  const [faqsList, setFaqsList] = useState(faqs);
  const [subscriber, setSubscriber] = useState('');
  const defaultContact = {
    name: '',
    email: '',
    message: '',
  };
  const [contactInfo, setContactInfo] = useState(defaultContact);
  const [loading, setLoading] = useState(false);

  const openFeature = (item) => {
    setFeatureSelected(item);
  };

  const onInputContactForm = (e) => {
    const { value, id } = e.target;
    setContactInfo({ ...contactInfo, [id]: value });
  };

  const scrollToContact = () => {
    document.getElementById('contact_form').scrollIntoView();
  };

  const toggleFAQ = (x) => {
    let updatedList = [];
    const list = cloneDeep(faqsList);
    updatedList = list.map((faq, ndx) => {
      if (ndx === x) return { ...faq, isOpen: !faq.isOpen };
      return { ...faq };
    });
    setFaqsList(updatedList);
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
      setSubscriber('');
    });
  };

  const sendSubscription = async () => {
    setLoading(true);

    if (!validateEmail(subscriber)) {
      showError('Please enter a valid email address.');
    } else {
      try {
        const res = await emailjs.send('gmail_service', 'email_subscription', {
          email: subscriber,
        });
        if (res) {
          showSuccess(
            'Thank you for showing interest in our app.\nWe will keep you updated.'
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
        <TaglineContainer>
          <MainTag>
            <b>Reuse</b> containers.
            <br />
            <b>Reduce</b> congestion &amp; cost.
            <br />
            <b>Collaborate - for good.</b>
          </MainTag>
          <SubTag>
            <Subtitle color={colors.primaryDark}>
              Stack, reuse or collect clean, empty containers now!
            </Subtitle>
          </SubTag>
          <BottomTag>
            <NewsletterContainer>
              <input
                type="text"
                value={subscriber}
                placeholder="Add your email here..."
                onChange={({ target }) => setSubscriber(target.value)}
                disabled={loading}
              />
              <NewLetterBtn onClick={sendSubscription} disabled={loading}>
                <ButtonLargeText color="white">Keep Me Updated</ButtonLargeText>
              </NewLetterBtn>
            </NewsletterContainer>
            <Body2 color={colors.textSecondary}>
              *Easy to use Web App coming soon. Register your interest above.
            </Body2>
          </BottomTag>
        </TaglineContainer>
        <HeroMap>
          <img src={mapImg} alt="map" />
        </HeroMap>
      </HeroContainer>
      <FeaturesSection>
        <Container>
          <FeaturesOutline>
            <FeaturesContainer>
              {featureSelected ? (
                <FeatureItemFull>
                  <img src={featureSelected.icon} alt={featureSelected.title} />
                  <FeatureInfo>
                    <Subtitle color={colors.primaryDark}>
                      {featureSelected.title}
                    </Subtitle>
                    <Body2 color={colors.textSecondary}>
                      {featureSelected.fullDesc}
                    </Body2>
                    <FindOutBtn>
                      <Body2
                        onClick={() => setFeatureSelected()}
                        color={colors.secondaryGreen}>
                        Close
                      </Body2>
                    </FindOutBtn>
                  </FeatureInfo>
                </FeatureItemFull>
              ) : (
                features.map((item) => (
                  <FeatureItem key={item.title}>
                    <img src={item.icon} alt={item.title} />
                    <FeatureInfo>
                      <Subtitle color={colors.primaryDark}>
                        {item.title}
                      </Subtitle>
                      <Body2 color={colors.textSecondary}>
                        {item.shortDesc}
                      </Body2>
                      <FindOutBtn>
                        <Body2
                          onClick={() => openFeature(item)}
                          color={colors.secondaryGreen}>
                          Find out more
                        </Body2>
                      </FindOutBtn>
                    </FeatureInfo>
                  </FeatureItem>
                ))
              )}
            </FeaturesContainer>
          </FeaturesOutline>

          <AppImgSection>
            <h5>
              Join the VirtualStack® community.
              <br />
              New Web App coming soon.
            </h5>
            <img src={appScreenShot} alt="App Screen Shot" />
          </AppImgSection>
        </Container>

        <AboutSection id="about_section">
          <Container>
            <AboutTop>
              <AboutTopLeft>
                <Subtitle color={colors.infoMain}>ABOUT VIRTUALSTACK®</Subtitle>
                <h3>We saw a need &amp; created a solution.</h3>
              </AboutTopLeft>
              <AboutTopRight>
                <Body3 color={colors.textSecondary}>
                  There are more disruptions to moving containerised freight
                  than ever. What if an importer allowed an exporter to come to
                  their yard to collect their empties for re-use - saving heavy
                  vehicle congestion, CO2 emissions, empty depot issues and the
                  cost of an entire transport leg!
                  <br />
                  <br /> What if an exporter could avoid empty depot issues and
                  collect a suitable empty from a nearby importers yard,
                  reducing CO2 and empty depot fees!
                </Body3>
              </AboutTopRight>
            </AboutTop>
          </Container>
          <AboutBottom>
            <Container>
              <img src={aboutImg} alt="About VirtualStack" />
              <AboutBottomRight>
                <h5>Fast automated service</h5>
                <Body3 color={colors.textSecondary}>
                  Let The VirtualStack® request hire of the empties directly to
                  the Shipping Line on your behalf. <b>Approval is instant!</b>
                  <br /> <br /> Your time is now free to organise transport of
                  the empty with the carrier of your choice.
                </Body3>
              </AboutBottomRight>
            </Container>
          </AboutBottom>
        </AboutSection>
        <SettingsSection>
          <Container>
            <SettingsLeft>
              <h5>Customise your settings</h5>
              <Body3 color={colors.textSecondary}>
                Accessed via the account settings interface... Lorem ipsum is a
                placeholder text commonly used to demonstrate the visual form,
                without relying on meaningful content. Lorem ipsum may be used
                as a placeholder before final copy is available.
              </Body3>
              <Checklist>
                <CheckImg src={checkIcon} />
                <Body3 color={colors.textSecondary}>
                  <b>
                    Select your preferred
                    <br />
                    container types.
                  </b>
                </Body3>
              </Checklist>
              <Checklist>
                <CheckImg src={checkIcon} />
                <Body3 color={colors.textSecondary}>
                  <b>
                    Prioritise available containers
                    <br />
                    closest to your location.
                  </b>
                </Body3>
              </Checklist>
              <Checklist>
                <CheckImg src={checkIcon} />
                <Body3 color={colors.textSecondary}>
                  <b>
                    Select your preferred
                    <br />
                    shipping lines.
                  </b>
                </Body3>
              </Checklist>
            </SettingsLeft>
            <img src={settingsImg} alt="Customise your settings" />
          </Container>
        </SettingsSection>
        <BenefitsSection>
          <Container>
            <img src={benefitsImg} alt="Financial Benefits" />
            <BenefitsRight>
              <h5>Financial &amp; environmental benefits</h5>
              <Body3 color={colors.textSecondary}>
                We are implementing emissions calculations from the McKinnon
                Report 2010 – Heriot-Watt University, Edinburgh:{' '}
                <a
                  href="https://www.wri.org/insights/everything-you-need-know-about-fastest-growing-source-global-emissions-transport"
                  target="_blank"
                  rel="noreferrer">
                  read more about it here
                </a>
                <br />
                <br />
                Your dashboard will display an average of what you have saved
                for each container, by skipping the depot hire process.
                <br />
                <br />
                Be the solution for reduction of Diesel consumption and
                congestion by taking a return trip to the depot{' '}
                <b>off the road!</b>
              </Body3>
            </BenefitsRight>
          </Container>
        </BenefitsSection>
        <MembershipSection>
          <Container>
            <MembershipLeft>
              <Subtitle color={colors.infoMain}>ACCOUNT MEMBERSHIP</Subtitle>
              <h3>Sign up now for instant access to our early bird trial!</h3>
              <Body3 color={colors.textSecondary}>
                Transaction Fees are minimal depending on how you use The
                Virtual Stack. Early birders will only be charged for every
                successful empty container collected, which helps pay for
                maintinence of The Virtual Stack.
                <br />
                <br /> Read our{' '}
                <a href="/terms-conditions">Terms &amp; Conditions</a> for more
                info on charges and fees. Or get in touch with a team member now
                and find out how VirtualStack® will seriously benefit your
                business.
              </Body3>
              <ActionContainer>
                <GreenBtn onClick={scrollToContact}>
                  <ButtonLargeText color="white">Contact Us</ButtonLargeText>
                </GreenBtn>
                <WhiteBtn>
                  <ButtonLargeText color={colors.infoMain}>
                    Sign Up For Instant Access
                  </ButtonLargeText>
                </WhiteBtn>
              </ActionContainer>
            </MembershipLeft>
            <img src={membershipImg} alt="Account Membership" />
          </Container>
        </MembershipSection>
        <FAQSection>
          <h3>FAQ&apos;s</h3>
          <FAQList>
            {faqsList.map((x, ndx) => (
              <FAQ key={ndx}>
                <Question onClick={() => toggleFAQ(ndx)}>
                  <Subtitle
                    color={
                      x.isOpen ? colors.primaryDark : colors.textSecondary
                    }>
                    {x.question}
                  </Subtitle>
                  <IconContainer>
                    <img src={x.isOpen ? minusIcon : plusIcon} alt="Icon" />
                  </IconContainer>
                </Question>
                {x.isOpen ? (
                  <Answer>
                    <Body3 color={colors.textSecondary}>{x.answer}</Body3>
                  </Answer>
                ) : null}
              </FAQ>
            ))}
          </FAQList>
        </FAQSection>
        <ContactSection id="contact_form">
          <ContactContainer>
            <ContactInner>
              <h5>Have another question? Let’s talk!</h5>
              <FormRow>
                <FormCol>
                  <InputContainer>
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      autoComplete="no"
                      value={contactInfo.name}
                      disabled={loading}
                      onChange={(e) => onInputContactForm(e)}
                    />
                  </InputContainer>
                  <InputContainer>
                    <label htmlFor="email">Your Email *</label>
                    <input
                      type="text"
                      id="email"
                      value={contactInfo.email}
                      disabled={loading}
                      onChange={(e) => onInputContactForm(e)}
                    />
                  </InputContainer>
                </FormCol>
                <FormCol>
                  <InputContainer>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      autoComplete="none"
                      value={contactInfo.message}
                      disabled={loading}
                      onChange={(e) => onInputContactForm(e)}
                    />
                  </InputContainer>
                </FormCol>
              </FormRow>
              <ContactBtnContainer>
                <WhiteBtn onClick={submitContactForm} disabled={loading}>
                  <ButtonLargeText color={colors.infoMain}>
                    Send
                  </ButtonLargeText>
                </WhiteBtn>
              </ContactBtnContainer>
            </ContactInner>
          </ContactContainer>
        </ContactSection>
        <Footer />
      </FeaturesSection>
    </div>
  );
};

const HeroContainer = styled.div`
  height: 760px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const TaglineContainer = styled.div`
  flex: 57%;
  height: 100%;
  padding-bottom: 65px;
  background-image: url(${heroBG});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeroMap = styled.div`
  flex: 43%;
  height: 100%;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center left;
    pointer-events: none;
  }
`;

const MainTag = styled.h1`
  font-size: 48px;
  font-weight: 400;
  line-height: 56px;
  color: ${colors.primaryDark};
  max-width: 612px;
  width: 100%;
`;

const SubTag = styled.div`
  max-width: 610px;
  margin-top: 8px;
  margin-bottom: 60px;
  width: 100%;
`;

const BottomTag = styled.div`
  max-width: 610px;
  width: 100%;
`;

const NewsletterContainer = styled.div`
  background: white;
  box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.12);
  border-radius: 24px;
  max-width: 540px;
  width: 100%;
  padding: 12px;
  display: flex;
  margin-bottom: 15px;

  & > input {
    width: 100%;
    box-shadow: none !important;
    border: none !important;
    background: none !important;
    outline: none !important;
    color: ${colors.primaryDark};
    margin-left: 5px;
    margin-right: 5px;

    &::placeholder {
      color: ${colors.textSecondary};
    }
  }

  & > button {
    width: 100%;
    max-width: 180px;
  }
`;

const NewLetterBtn = styled.button`
  border: none;
  background-color: ${colors.primary};
  height: 42px;
  border-radius: 30px;

  &:hover {
    opacity: 0.86;
  }

  &:disabled {
    opacity: 0.86;
    cursor: progress;
  }
`;

const FeaturesSection = styled.div`
  background-color: ${colors.grey100};
`;

const FeaturesOutline = styled.div`
  width: 100%;
  background: transparent;
  border-radius: 16px;
  border: 2px solid white;
  padding: 10px;
  position: relative;
  top: -120px;
`;

const FeaturesContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  border: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

const FeatureItemFull = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 60px 30px;
  width: 100%;
  animation: fadeIn 0.8s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  & > img {
    width: 36px;
    height: auto;
    margin-right: 25px;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 60px 30px;
  max-width: 320px;
  animation: fadeIn 0.8s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  & > img {
    width: 36px;
    height: auto;
    margin-right: 25px;
  }
`;

const FeatureInfo = styled.div`
  & > div {
    margin-bottom: 6px;
  }
`;

const FindOutBtn = styled.div`
  margin-bottom: 0;

  & > div {
    cursor: pointer;
    font-weight: 600;
    border-bottom: 1px solid;
    transition: all 0.15s ease-in-out;
    display: inline-block;
    margin-bottom: 0;

    &:hover {
      opacity: 0.76;
    }
  }
`;

const AppImgSection = styled.div`
  margin: auto;
  text-align: center;
  padding-bottom: 70px;

  h5 {
    color: ${colors.primaryDark};
  }

  img {
    pointer-events: none;
  }
`;

const AboutSection = styled.div`
  background-color: white;
  padding-top: 100px;
  padding-bottom: 80px;
`;

const AboutTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AboutTopLeft = styled.div`
  max-width: 680px;
  width: 100%;
  flex: 1;

  & h3 {
    color: ${colors.primaryDark};
    margin-top: 6px;
    max-width: 540px;
  }
`;

const AboutTopRight = styled.div`
  max-width: 445px;
  width: 100%;
  flex: 1;
`;

const AboutBottom = styled.div`
  position: relative;

  & img {
    position: absolute;
    left: 0;
    pointer-events: none;
    max-width: 680px;
    width: 100%;
    flex: 1;
  }

  & > .container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 150px;
  }
`;

const AboutBottomRight = styled.div`
  max-width: 445px;
  width: 100%;
  flex: 1;
  margin-left: auto;
  margin-top: 180px;

  & h5 {
    margin-bottom: 6px;
    color: ${colors.primaryDark};
  }
`;

const SettingsSection = styled.div`
  position: relative;
  padding-top: 100px;
  background: linear-gradient(
    137.26deg,
    #b2ebf2 44.7%,
    rgba(77, 182, 172, 0.5) 100%
  );
  opacity: 0.8;

  & > .container {
    display: flex;
    justify-content: space-between;

    & > img {
      position: absolute;
      pointer-events: none;
      right: 0;
      bottom: 0;
      max-width: 700px;
      width: 100%;
      flex: 1;
    }
  }
`;

const SettingsLeft = styled.div`
  max-width: 445px;
  width: 100%;
  flex: 1;
  margin-right: auto;
  margin-bottom: 100px;

  & h5 {
    margin-bottom: 6px;
    color: ${colors.primaryDark};
  }
`;

const CheckImg = styled.img`
  width: 48px;
  height: 48px;
  filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.12));
  margin-right: 16px;
`;

const Checklist = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;

  &:nth-child(3) {
    margin-top: 35px;
  }
`;

const BenefitsSection = styled.div`
  position: relative;
  background-color: white;
  padding-bottom: 120px;

  & > .container {
    display: flex;
    justify-content: space-between;

    & > img {
      pointer-events: none;
      position: absolute;
      left: 0;
      top: -1px;
      max-width: 650px;
      width: 100%;
      flex: 1;
    }
  }
`;

const BenefitsRight = styled.div`
  max-width: 460px;
  width: 100%;
  flex: 1;
  margin-left: auto;
  margin-top: 155px;

  & h5 {
    margin-bottom: 6px;
    color: ${colors.primaryDark};
  }

  & a {
    color: ${colors.infoMain};
    border-bottom: 1px solid;
    text-decoration: none;
  }
`;

const MembershipSection = styled.div`
  background-color: ${colors.grey100};
  padding-top: 100px;
  padding-bottom: 100px;

  & .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & img {
    pointer-events: none;
    max-width: 445px;
  }
`;

const MembershipLeft = styled.div`
  max-width: 540px;
  width: 100%;
  flex: 1;

  & h3 {
    color: ${colors.primaryDark};
    margin-top: 6px;
    margin-bottom: 25px;
  }

  & a {
    color: ${colors.infoMain};
    border-bottom: 1px solid;
    text-decoration: none;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;

  & > div {
    margin-right: 15px;
  }
`;

const GreenBtn = styled.div`
  background: ${colors.infoMain};
  border-radius: 30px;
  border: none;
  filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.12));
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  padding-left: 22px;
  padding-right: 22px;

  &:hover {
    opacity: 0.86;
  }
`;

const WhiteBtn = styled.button`
  background: white;
  border-radius: 30px;
  border: none;
  filter: drop-shadow(0px 1px 14px rgba(0, 0, 0, 0.1));
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  padding-left: 22px;
  padding-right: 22px;

  &:hover {
    opacity: 0.76;
  }

  &:disabled {
    opacity: 0.86;
    cursor: progress;
  }
`;

const FAQSection = styled.div`
  background-color: ${colors.grey100};
  padding-top: 50px;
  padding-bottom: 100px;

  & h3 {
    color: ${colors.primaryDark};
    text-align: center;
    margin-bottom: 60px;
  }
`;

const FAQList = styled.div`
  max-width: 730px;
  border-top: 4px solid white;
  margin: auto;
`;

const FAQ = styled.div`
  padding-top: 24px;
  padding-bottom: 26px;
  border-bottom: 4px solid white;
`;

const Question = styled.div`
  cursor: pointer;
  position: relative;

  &:hover {
    opacity: 0.8;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    pointer-events: none;
    width: 80%;
    height: auto;
  }
`;

const Answer = styled.div`
  animation: fadeIn 0.8s;
  padding-top: 20px;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ContactSection = styled.div`
  background-color: ${colors.grey100};
  background-image: url(${footerBG});
  padding-bottom: 100px;
  background-repeat: no-repeat;
  background-size: 600px;
  background-position: bottom right;
`;

const ContactContainer = styled.div`
  background-color: ${colors.infoMain};
  box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.12);
  border-radius: 24px;
  border: 4px solid white;
  max-width: 900px;
  margin: auto;
  width: 100%;
  padding: 50px 15px;
`;

const ContactInner = styled.div`
  max-width: 720px;
  margin: auto;
  width: 100%;

  & h5 {
    color: white;
    margin-bottom: 40px;
  }
`;

const FormRow = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ContactBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const FormCol = styled.div`
  width: 100%;
  &:first-child {
    margin-right: 15px;
  }
  &:last-child {
    margin-left: 15px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 25px;

  & label {
    font-size: 12px;
    line-height: 12px;
    letter-spacing: 0.15px;
    color: white;
    width: 100%;
    cursor: pointer;
    margin-bottom: 4px;
  }
  & input,
  & textarea {
    width: 100%;
    background: none;
    box-shadow: none !important;
    outline: none !important;
    border: none;
    border-bottom: 2px solid rgba(225, 225, 225, 0.42);
    color: white;
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 0.15px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;

    &:focus {
      border-bottom-color: rgba(225, 225, 225, 0.78);
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: white;
      box-shadow: 0 0 0px 1000px transparent inset;
      transition: background-color 5000s ease-in-out 0s;
    }
  }

  & textarea {
    height: 113px;
    resize: none;
    line-height: 20px;
  }
`;
