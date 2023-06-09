import styled, { css } from "styled-components";

function GreyInput({ ...props }) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input<{
  middleWidth?: boolean;
  fullWidth?: boolean;
}>`
  font-size: 14px;
  outline: none;
  border: 1px solid #ccc;
  padding: 0.5rem;
  width: 200px;
  background: #ccc;
  border-radius: 4px;

  &:focus {
    border: 1px solid #707070;
  }

  ${(props) =>
    props.fullWidth &&
    css`
      width: 416px;
    `}

  ${(props) =>
    props.middleWidth &&
    css`
      width: 549px;
    `}
`;

export default GreyInput;