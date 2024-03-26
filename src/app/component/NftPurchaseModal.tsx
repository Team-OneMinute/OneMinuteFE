'use client';
import React from 'react';
import styled from 'styled-components';
import { CrossmintPaymentElement } from '@crossmint/client-sdk-react-ui';

interface Props {
    closeModal: () => void;
}

const NftPurchaseModal: React.FC<Props> = ({ closeModal }) => {
    const projectId = '412da5ae-a860-4cb3-9969-55948e5c327f';
    const collectionId = 'a221d4ac-0f9a-4205-bc61-a7816c5963ea';
    const environment = "staging";

    return (
        <Overlay onClick={(e) => e.target === e.currentTarget && closeModal()}>
            <Content>
                <CrossmintPaymentElement
                    projectId={projectId}
                    collectionId={collectionId}
                    environment={environment}
                    emailInputOptions={{
                        show: true,
                    }}
                    mintConfig={{
                        type: 'erc-721',
                        totalPrice: '0.001',
                    }}
                />
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
    background-color: white;
    box-sizing: border-box;
    border-radius: 8vmin;
    height: 50vh;
    text-align: center;
    position: fixed;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 80vmin;
    z-index: 13;
`;

export default NftPurchaseModal;
