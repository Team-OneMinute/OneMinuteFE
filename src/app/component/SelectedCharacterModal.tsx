'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { ButtonBase } from '@/app/component/Atoms/Button';

interface props {
    title: string;
    explanation: string;
    onClickHandler: () => void;
}

export const SelectedCharacterModal: React.FC<props> = ({ title, explanation, onClickHandler }) => {
    return (
        <Overlay>
            <Content>
                <TitleArea>
                    <Title>{title}</Title>
                </TitleArea>
                <ExplanationArea>
                    <Explanation>{explanation}</Explanation>
                </ExplanationArea>
                <NavigationArea>
                    <Navigation>
                        <ButtonBase text='TOP' onClick={onClickHandler} />
                    </Navigation>
                </NavigationArea>
            </Content>
        </Overlay>
    );
};

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: -100vh;
    left: -100vw;
    bottom: -100vh;
    right: -100vw;
    z-index: 1;
`;

const Content = styled.div`
    background-color: black;
    box-sizing: border-box;
    border-radius: 8vmin;
    text-align: center;
    position: fixed;
    height: 50%;
    width: 80%;
    top: 25%;
    left: 10%;
    display: flex;
    flex-direction: column;
    z-index: 11;
`;

const TitleArea = styled.div`
    width: 100%;
    height: 15%;
`;

const Title = styled.div`
    color: white;
`;

const ExplanationArea = styled.div`
    width: 100%;
    height: 65%;
`;

const Explanation = styled.div`
    color: white;
`;

const NavigationArea = styled.div`
    width: 100%;
    height: 20%;
`;

const Navigation = styled.div`
    margin: auto;
    width: 30%;
    height: 50%;
`;
