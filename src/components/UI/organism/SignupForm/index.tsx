import React from 'react';
import * as Style from './styled';
import InputField, { InputFieldProps } from '../../molecule/InputField';
import { Button } from '../../atom';
import theme from '../../../../style/theme';
import useForm from '../../../../hooks/useForm';
import signupValidator, { SignupInfoType } from '../../../../validator/signupValidator';

interface SignupFormProps {
  handleSubmit: ({ id, pw, nickname }: SignupInfoType) => Promise<string>;
}

function SignupForm({ handleSubmit }: SignupFormProps) {
  const { values, error, handleChange, handleSubmitWithErrorControl } = useForm<SignupInfoType>({
    onSubmit: handleSubmit,
    initialState: { id: '', pw: '', confirmPW: '', nickname: '' },
    validator: signupValidator,
  });

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...values, id: event.target.value });
  };

  const handlePwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...values, pw: event.target.value });
  };

  const handleConfirmPWChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...values, confirmPW: event.target.value });
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({ ...values, nickname: event.target.value });
  };

  const idFormInfo: InputFieldProps = {
    group: 'email',
    sortDirection: 'column',
    labelProps: { id: 'email-label', content: 'email', color: theme.color.color_primary_400 },
    inputProps: { value: values.id, type: 'email', onChange: handleIdChange },
  };

  const pwFormInfo: InputFieldProps = {
    group: 'password',
    sortDirection: 'column',
    labelProps: { id: 'password-label', content: 'password', color: theme.color.color_primary_400 },
    inputProps: { value: values.pw, type: 'password', onChange: handlePwChange },
  };

  const confirmPWFormInfo: InputFieldProps = {
    group: 'confirmPassword',
    sortDirection: 'column',
    labelProps: { id: 'confirm-password-label', content: 'confirm password', color: theme.color.color_primary_400 },
    inputProps: { value: values.confirmPW || '', type: 'password', onChange: handleConfirmPWChange },
  };

  const nicknameFormInfo: InputFieldProps = {
    group: 'nickname',
    sortDirection: 'column',
    labelProps: { id: 'nickname-label', content: 'nickname', color: theme.color.color_primary_400 },
    inputProps: { value: values.nickname, type: 'text', onChange: handleNicknameChange },
  };

  return (
    <Style.Container onSubmit={handleSubmitWithErrorControl}>
      <Style.InputWrapper>
        <InputField {...idFormInfo} />
      </Style.InputWrapper>
      <Style.InputWrapper>
        <InputField {...pwFormInfo} />
      </Style.InputWrapper>
      <Style.InputWrapper>
        <InputField {...confirmPWFormInfo} />
      </Style.InputWrapper>
      <Style.InputWrapper>
        <InputField {...nicknameFormInfo} />
      </Style.InputWrapper>
      <Style.Error>{error || ''}</Style.Error>
      <Button width="100%" theme="primary" size="large">
        회원가입
      </Button>
    </Style.Container>
  );
}

export default SignupForm;
