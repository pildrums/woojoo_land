import styled from "styled-components";

// 저희 props 대신 rest를 사용하기로 결정했었습니다.
function GreyInput({ ...props }) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  font-size: 0.875rem;
  outline: none;
  border: 0.0625rem solid #ccc;
  padding: 0.5rem;
  width: 12.5rem;
  background: #ccc;
  border-radius: 0.25rem;

  &:focus {
    border: 0.0625rem solid #707070;
  }
`;

export default GreyInput;
