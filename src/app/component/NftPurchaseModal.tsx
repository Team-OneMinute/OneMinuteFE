'use client';
import React from 'react';
import styled from 'styled-components';
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui';

interface Props {
    closeModal: () => void;
}

const NftPurchaseModal: React.FC<Props> = ({ closeModal }) => {
    const projectId = '412da5ae-a860-4cb3-9969-55948e5c327f';
    const collectionId = '9c4490e9-e795-4280-b138-85ffe2c64910';
    const environment = 'staging';
    const myWalletAddress = '0x4dC65015ce1c7CfC5Cb62d37051a888aa0FEA757'; // TODO: Crossmintのwalletアドレスを取得して渡すようにする

    return (
        <Overlay onClick={(e) => e.target === e.currentTarget && closeModal()}>
            <Content>
                <InfoArea>Can't play not buy nft</InfoArea>
                <PaymentButtonArea>
                    <CrossmintPayButton
                        mintTo={myWalletAddress}
                        projectId={projectId}
                        collectionId={collectionId}
                        environment={environment}
                        mintConfig={{
                            quantity: '1',
                            type: 'managed-erc-721',
                        }}
                        checkoutProps={{ paymentMethods: ['fiat', 'ETH', 'SOL'] }}
                    />
                </PaymentButtonArea>
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
    z-index: 12;
`;

const Content = styled.div`
    background-color: black;
    box-sizing: border-box;
    border-radius: 8vmin;
    height: 80%;
    text-align: center;
    position: fixed;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 80vmin;
    z-index: 13;
`;

const InfoArea = styled.div`
    width: 100%;
    height: 90%;
    color: white;
`;

const PaymentButtonArea = styled.div`
    width: 100%;
    height: 10%;
    text-align: center;
`;

export default NftPurchaseModal;
