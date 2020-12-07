import styled, {css} from 'styled-components';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
            margin-top: 16px;
            color: #666360;
            background: #232129;
            border-radius: 10px;
            border: 2px solid #232129;
            width: 100%;
            padding: 16px;
            display: flex;
            align-items: center;
            
           ${props => props.isFocused && css`
                color: #FF9000;
                border-color: #FF9000;
          `}

          ${props => props.isFilled && css`
                color: #FF9000;
          `}
            
           input {
                            flex: 1;
                            border: 0;
                            background: transparent;
                            color: #f4ede8;

                            &::placeholder {
                                color: #666360;
                            }
                            & + input {
                                margin-top: 8px;
                            }
            }

            svg {
                margin-right: 16px;
            }

`;