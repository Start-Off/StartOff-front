import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Style from './styled';
import { Button, Anchor, Title, Icon } from '../../../components/UI/atom';
import { BoxWithIcon } from '../../../components/UI/molecule';
import SignupForm from '../../../components/UI/organism/SignupForm';
import { SignupInfoType } from '../../../validator/signupValidator';
import theme from '../../../common/theme';
import { signupAPI } from '../../../api/user';
import { signinPath } from '../../../Routes';

function SigninPageTemplate() {
  const history = useHistory();

  const handleSignupAPI = async (signupInfo: SignupInfoType) => {
    await signupAPI(signupInfo);

    history.push(signinPath);
    return '';
  };

  const handleGithubButton = () => {};

  return (
    <Style.Container>
      <BoxWithIcon iconType="Logo" iconSize="extraLarge" sortDirection="column">
        <Title fontsize="h1">SIGNUP</Title>
      </BoxWithIcon>
      <Button width="100%" size="large" theme="github" onClick={handleGithubButton}>
        <Icon icon="Logo" color={theme.color.color_brightness_900} />
        <Style.GithubSigninText>Github로 로그인</Style.GithubSigninText>
      </Button>
      <SignupForm handleSubmit={handleSignupAPI} />
      <Style.MoveContainer>
        <Style.YesAccountText>계정이 있다면?</Style.YesAccountText>
        <Anchor to="/signin" color={theme.color.color_primary_400}>
          로그인하기
        </Anchor>
      </Style.MoveContainer>
    </Style.Container>
  );
}

export default SigninPageTemplate;