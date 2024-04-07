import styled, { css } from "styled-components";

export const StyledDragItem = styled.li<{
  $draggedItem: boolean;
  $draggedOver: boolean;
}>`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border: 2px solid lightgray;
  margin-bottom: 0.5rem;
  cursor: grab;
  user-select: none;
  ${({ $draggedItem }) =>
    $draggedItem &&
    css`
      opacity: 0.8;
      cursor: grabbing;
      border: 2px solid green;
    `}
`;
