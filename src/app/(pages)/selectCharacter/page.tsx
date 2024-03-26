'use client';
import { ButtonBase } from '@/app/component/Atoms/Button';
import { selectCharacter } from '@/app/service/character';
import React, { useState } from 'react';
import styled from 'styled-components';

// TODO: NFTを持っていない人が絶対にここの画面に来ないようにする
// TODO: ↑フロント、バックエンドの両方をチェックしないといけない
export default function SelectCharacterPage() {
    const [selectedImgID, setSelectedGameId] = useState<number>(0);
    const characterNum = 4;

    const tmpPathHead = '/static/images/temp/character/character';
    const tmpPathTail = '.png';

    const onClickImg = (selectID: number) => {
        setSelectedGameId(selectID);
    };

    const selectableCharacter = () => {
        const imgList = [];
        for (let i = 0; i < characterNum; i++) {
            if (i != selectedImgID) {
                console.log(i);
                console.log(selectedImgID);
                const fullPath = `${tmpPathHead}${i}${tmpPathTail}`;
                imgList.push(<InActiveCharacterImage src={fullPath} onClick={() => onClickImg(i)} />);
            }
        }
        return imgList;
    };

    const selectedCharacter = () => {
        const fullPath = `${tmpPathHead}${selectedImgID}${tmpPathTail}`;
        return <ActiveCharacterImage src={fullPath} />;
    };

    return (
        <Background>
            <HeaderArea>
                <TitleArea>
                    <Title>Select Character</Title>
                </TitleArea>
            </HeaderArea>
            <CharacterImageArea>
                <InActiveCharacterImageArea>{selectableCharacter()}</InActiveCharacterImageArea>
                <ActiveCharacterImageArea>{selectedCharacter()}</ActiveCharacterImageArea>
            </CharacterImageArea>
            <ButtonArea>
                <ButtonBase
                    text='I Choose You !'
                    onClick={() => selectCharacter(String(selectedImgID), 'takeuma.com@example.com')}
                />
            </ButtonArea>
            <InfoArea>
                <InfoText>character info</InfoText>
            </InfoArea>
        </Background>
    );
}

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/background/background_black.png);
    background-size: cover;
`;

const HeaderArea = styled.div`
    width: 100%;
    height: 10%;
    padding: 5% 2%;
    margin-bottom: 5%;
`;

const TitleArea = styled.div`
    text-align: center;
    width: 100%;
    height: 100%;
`;

const Title = styled.text`
    text-align: center;
    font-size: 30px;
    color: white;
`;

const CharacterImageArea = styled.div`
    width: 100%;
    height: 60%;
`;

const InActiveCharacterImageArea = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
`;

const ActiveCharacterImageArea = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
`;

const InActiveCharacterImage = styled.img`
    height: 100%;
    margin-left: 5%;
    margin-right: 5%;
`;

const ActiveCharacterImage = styled.img`
    height: 100%;
`;

const InfoArea = styled.div`
    width: 100%;
    height: 15%;
`;

const InfoText = styled.div`
    display: flex;
    justify-content: center;
    color: #fff;
`;

const ButtonArea = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    padding: 3% 20%;
`;
