import styled from 'styled-components';
import colors from './colors';

export const ButtonLargeText = styled.div`
  color: ${({ color }) => color || colors.textPrimary};
  font-weight: 600;
  font-size: 15px;
  line-height: 26px;
  letter-spacing: 0.5px;
`;

export const ButtonMedText = styled.div`
  color: ${({ color }) => color || colors.textPrimary};
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.4px;
`;

export const ButtonSmallText = styled.div`
  color: ${({ color }) => color || colors.textPrimary};
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.46px;
`;

export const Subtitle = styled.div`
  color: ${({ color }) => color || colors.textPrimary};
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
`;

export const Body2 = styled.div`
  color: ${({ color }) => color || colors.textPrimary};
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.4px;
`;

export const Body3 = styled.div`
  color: ${({ color }) => color || colors.textPrimary};
  font-weight: 400;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.4px;
`;
