'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// service
import { ButtonBase } from '@/app/component/Atoms/Button';
import { getCredential } from '@/app/service/authentication';
import { selectCharacter } from '@/app/service/character';
import { getUser, setCharacterFlgInUser } from '@/app/service/user';
import { useRouter } from 'next/navigation';

// component
import { SelectedCharacterModal } from '@/app/component/SelectedCharacterModal';

// TODO: NFTを持っていない人が絶対にここの画面に来ないようにする
// TODO: ↑フロント、バックエンドの両方をチェックしないといけない
export default function SelectCharacterPage() {
    const router = useRouter();
    const [selectedImgID, setSelectedGameId] = useState<number>(0);
    const [user, setUser] = useState<User | null>(null);
    const [submitCharacter, setSubmitCharacter] = useState<boolean>(false);
    const characterNum = 4;

    const tmpPathHead = '/static/images/temp/character/character';
    const tmpPathTail = '.png';

    const onClickImg = (selectID: number) => {
        setSelectedGameId(selectID);
    };

    const fetchUser = async () => {
        const userCredential = getCredential();
        if (userCredential === undefined || userCredential === null) {
            router.push('/');
        }
        const userData = await getUser(userCredential!.uid);
        setUser(userData);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const inActiveCharacter = () => {
        const imgList = [];
        for (let i = 0; i < characterNum; i++) {
            if (i != selectedImgID) {
                const fullPath = `${tmpPathHead}${i}${tmpPathTail}`;
                imgList.push(<InActiveCharacterImage src={fullPath} onClick={() => onClickImg(i)} />);
            }
        }
        return imgList;
    };

    const activeCharacter = () => {
        const fullPath = `${tmpPathHead}${selectedImgID}${tmpPathTail}`;
        return <ActiveCharacterImage src={fullPath} />;
    };

    const selectedCharacter = async () => {
        setCharacterFlgInUser(user!.docNo);
        setSubmitCharacter(true);

        // TODO: Web3Auth get
        const walletAddress = '0x9E20124F51e236D008886713a8FA6F522472892B';
        const result = await selectCharacter(user!.userId, walletAddress, String(selectedImgID));
        // TODO: add banner while claiming thr nft
        // https://github.com/gelatodigital/gelato-thirdweb-relay/blob/master/src/components/apps/GaslessNFTApp.tsx#L94
        const tokenId = result.relayResponse.tokenId;
        const baseUrl = result.baseUrl;
    };

    const modalOnclickHandler = () => {
        router.push('/');
    };

    return (
        <Background>
            <HeaderArea>
                <TitleArea>
                    <Title>Select Character</Title>
                </TitleArea>
            </HeaderArea>
            <CharacterImageArea>
                <InActiveCharacterImageArea>{inActiveCharacter()}</InActiveCharacterImageArea>
                <ActiveCharacterImageArea>{activeCharacter()}</ActiveCharacterImageArea>
            </CharacterImageArea>
            <ButtonArea>
                <ButtonBase text='I Choose You !' onClick={() => selectedCharacter()} />
            </ButtonArea>
            <InfoArea>
                <InfoText>character info</InfoText>
            </InfoArea>
            {submitCharacter == true && (
                <SelectedCharacterModal
                    title='Congratulation'
                    explanation='Character creating... wait a minute'
                    onClickHandler={modalOnclickHandler}
                />
            )}
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
