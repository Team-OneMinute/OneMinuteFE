"use client"
import styled from "styled-components";

interface props {
    pageName: string;
}

const UserSlide: React.FC<props> = ({ pageName }) => {
    return (
        <Background>
            {pageName}
        </Background>
    );
  };
export default UserSlide;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/background/background1.png);
    background-size: cover;
`;

const NavigateButton = styled.button`
    width: 90px;
    height: 35px;
    margin: 40px;
    border: 2px solid #FFF;
    border-radius: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    color: #fff;
    background: transparent;
`;