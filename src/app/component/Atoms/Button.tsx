import React from 'react';
import styled from 'styled-components';

const BaseButton = styled.button`
    text-align: center;
    color: white;
    width: 100%;
    height: 100%;
    min-width: 100px;
    border-radius: 100vh;
    background-color: #eb6100;
`;

interface props {
    text: string;
    onClick: () => void;
}

// classNameを記載する
export const ButtonBase: React.FC<props> = ({ text, onClick }) => {
    return <BaseButton onClick={onClick}>{text}</BaseButton>;
};
