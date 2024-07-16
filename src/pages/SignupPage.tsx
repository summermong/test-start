import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import { Button } from 'stories/Button';

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { mutate: handleSignup, isSuccess } = useSignup();

  useEffect(() => {
    if (isSuccess) {
      alert('회원가입 성공');
      navigate('/login');
    }
  }, [isSuccess]);

  // console.log('password: ', password);
  // console.log('confirmPassword: ', confirmPassword);

  return (
    <Wrapper>
      <div>
        <Header>
          <Title>이메일로 회원가입</Title>
          <CloseButton>
            <img
              alt="close"
              src={`https://kr.object.ncloudstorage.com/icons/ic-close-btn.svg`}
            />
          </CloseButton>
        </Header>
        <InputSection>
          <InputWrapper>
            <Label htmlFor="emailInput">이메일</Label>
            <Input
              id="emailInput"
              data-cy="emailInput"
              type="text"
              placeholder="이메일을 입력해주세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="passwordInput">비밀번호</Label>
            <Input
              id="passwordInput"
              data-cy="passwordInput"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="confirmPasswordInput">비밀번호 확인</Label>
            <Input
              id="confirmPasswordInput"
              data-cy="confirmPasswordInput"
              type="password"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </InputWrapper>
          {password != confirmPassword && (
            <ErrorMessage data-testid="error-message">
              비밀번호가 일치하지 않습니다
            </ErrorMessage>
          )}
        </InputSection>
      </div>

      <Button
        disabled={!email || !password || password != confirmPassword}
        onClick={() => handleSignup({ username: email, password })}
        primary={true}
        label="회원가입"
      />
    </Wrapper>
  );
}

const ColumnSpaceBetween = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  ${ColumnSpaceBetween}
  height: 100%;
  background-color: #ffffff;
  padding: 0 16px;

  > button {
    margin-bottom: 24px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

const CloseButton = styled.button``;

const Title = styled.h1`
  color: #1d2745;
`;

const InputSection = styled.section`
  position: relative;
  margin-top: 40px;
`;

const Label = styled.label`
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 21px;
  color: #1d2745;
`;

const Input = styled.input`
  margin-bottom: 24px;

  padding-bottom: 8px;
  border-bottom: 1px solid #d6d7d9;
  color: #d6d7d9;

  &:focus {
    color: #1de5d4;
    border-bottom: 1px solid #1de5d4;
  }
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  background-color: ${props => (props.disabled ? '#f1f1f1' : '#1d2745')};
  color: ${props => (props.disabled ? '#bebebe' : '#ffffff')};
  margin-bottom: 24px;
`;

const ErrorMessage = styled.h6`
  font-size: 12px;
  line-height: 18px;
  color: #d01e1e;
  position: absolute;
  bottom: 0;
`;

const InputWrapper = styled.div`
  ${ColumnSpaceBetween}
`;
