import styled from 'styled-components';
import SignInBackgroundImg from '../../assets/sign-in-background.png';
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    max-width: 700px;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1 {
            margin-top: 24px;
        }

        button {
            margin-top: 16px;
            height: 56px;
            background: #FF9000;
            border-radius: 10px;
            border: 0;
            color: #312e38;
            width: 100%;
            padding: 0 16px;
            font-weight: 500;
            transition: background-color 0.2s;
            &:hover {
                background: ${shade(0.2, '#FF9000')}
            }
        }

        a {
            color: #F4EDE8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;
            &:hover {
                color: ${shade(0.2, '#F4EDE8')}
            }
        }
    }

    > a {
            color: #FF9000;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;
            &:hover {
                color: ${shade(0.2, '#FF9000')}
            }
            display: flex;
            align-items: center;

            svg {
                margin-right: 16px;
            }
    }
`;

export const BackGround = styled.div`
    flex: 1;
    background: url(${SignInBackgroundImg}) no-repeat center;
    background-size: cover;
`;
