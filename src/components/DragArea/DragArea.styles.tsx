import styled from "styled-components";

export const DragAreaWrapper = styled.div<{ $dragActive: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
  width: fit-content;
  ${({ $dragActive }) => $dragActive && `background-color: #e4ffe1;`}
`;
