'use client';
import styled from 'styled-components';

interface props {
    pageName: string;
}

const LegendSlide: React.FC<props> = ({ pageName }) => {
    return <Background>{pageName}</Background>;
};
export default LegendSlide;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/background/background1.png);
    background-size: cover;
`;
