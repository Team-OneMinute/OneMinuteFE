"use client"
import styled from "styled-components";

interface props {
    pageName: string;
}

const ShopSlide: React.FC<props> = ({ pageName }) => {
    return (
        <Background>
            {pageName}
        </Background>
    );
  };
export default ShopSlide;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/background/background4.png);
    background-size:100% auto;
`;