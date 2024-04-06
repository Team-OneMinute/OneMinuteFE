'use client';
import React from 'react';
import styled from 'styled-components';
import { NAVIGATION_AREA_HEIGHT, USER_AREA_HEIGht } from '@/app/styles';

// components
import { ButtonBase } from '@/app/component/Atoms/Button';

interface position {
    x: number;
    y: number;
}

interface props {
    games: Game[];
    rankings: Score[];
    pools: Pool[];
    selectedGameId: string | null;
    setSelectedGameId: (gameId: string) => void;
    setIsOpenDetailModal: (isOpen: boolean) => void;
}

const AllGameSlide: React.FC<props> = ({
    games,
    rankings,
    pools,
    selectedGameId,
    setSelectedGameId,
    setIsOpenDetailModal,
}) => {
    console.log('selectedGameId: ' + selectedGameId);
    const positionSet = [
        { x: 20, y: 20 },
        { x: 80, y: 80 },
        { x: 20, y: 80 },
        { x: 80, y: 20 },
    ];

    const isActive = (gameId: string) => {
        return gameId == selectedGameId;
    };

    const onClickNftAction = (gameId: string) => {
        if (!isActive(gameId)) {
            setSelectedGameId(gameId);
        }
    };

    const getGameTargetDiv = (games: Game[]) => {
        // TODO: Loading a image from local storage now. Change URL.
        if (games.length > 0) {
            return games.map((game, index) => {
                return (
                    <GameTarget
                        isActive={isActive(game.gameId)}
                        position={positionSet[index]}
                        onClick={() => onClickNftAction(game.gameId)}
                    >
                        <GameThumbnailImage src='/static/images/temp/game_thumnail_1.png' />
                        <SymbolNftImage src='/static/images/temp/character/character0.png' />
                    </GameTarget>
                );
            });
        }
    };

    const showGameInfoHandler = () => {
        setIsOpenDetailModal(true);
    };

    const rankingOrder = () => {
        const poolSize = pools.length;
        const rankingSize = rankings.length;
        return <div>{`challenger: ${poolSize} people RankingPools: ${rankingSize}`}</div>;
    };

    const maxReward = () => {
        return pools.length ? pools[0].potAmount : 0;
    };

    const rankingSummary = () => {
        //const poolSize = pools.length;
        const poolSize = pools.length;
        if (poolSize === 0) return 'a';
        console.log(pools.length);

        const firstRange = 0.1;
        const secondRange = 0.2;

        const firstRangeSize = Math.ceil(poolSize * firstRange);
        const secondRangeSize = Math.ceil(poolSize * secondRange);
        const thirdRangeSize = poolSize - firstRangeSize - secondRangeSize;

        const firstRangeTopRank = 1;
        const firstRangeUnderRank = firstRangeTopRank + firstRangeSize - 1;
        const secondRangeTopRank = firstRangeUnderRank + 1;
        const secondRangeUnderRank = secondRangeTopRank + secondRangeSize - 1;
        const thirdRangeTopRank = secondRangeUnderRank + 1;
        const thirdRangeUnderRank = thirdRangeTopRank + thirdRangeSize - 1;

        const firstRangeTopAmount = pools[firstRangeTopRank - 1].potAmount;
        const firstRangeUnderAmount = pools[firstRangeUnderRank - 1].potAmount;
        const secondRangeTopAmount = pools[secondRangeTopRank - 1].potAmount;
        const secondRangeUnderAmount = pools[secondRangeUnderRank - 1].potAmount;
        const thirdRangeTopAmount = pools[thirdRangeTopRank - 1].potAmount;
        const thirdRangeUnderAmount = pools[thirdRangeUnderRank - 1].potAmount;

        return (
            <>
                <div>
                    {firstRangeTopRank} ~ {firstRangeUnderRank} : ${firstRangeTopAmount} ~ ${firstRangeUnderAmount}
                </div>
                <div>
                    {secondRangeTopRank} ~ {secondRangeUnderRank} : ${secondRangeTopAmount} ~ ${secondRangeUnderAmount}
                </div>
                <div>
                    {thirdRangeTopRank} ~ {thirdRangeUnderRank} : ${thirdRangeTopAmount} ~ ${thirdRangeUnderAmount}
                </div>
            </>
        );
    };

    return (
        <Background>
            <GameFieldArea>
                <GameFieldImage />
                {getGameTargetDiv(games)}
            </GameFieldArea>
            z
            <DetailArea>
                <RankingNumberInfo>{rankingOrder()}</RankingNumberInfo>
                <RewardInfo>Max Reward {maxReward()}</RewardInfo>
                <RankingSummaryInfo>Ranking pot {rankingSummary()}</RankingSummaryInfo>
                <DetailButtonArea>
                    <ButtonBase text='Show Game' onClick={showGameInfoHandler} />
                </DetailButtonArea>
            </DetailArea>
        </Background>
    );
};
export default AllGameSlide;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/background/background_black.png);
    background-size: cover;
`;

const GameFieldArea = styled.div`
    position: relative;
    top: ${USER_AREA_HEIGht + NAVIGATION_AREA_HEIGHT}px;
    height: 278px;
    margin: 16px 4px;
`;
const GameFieldImage = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/island/allLand.png);
    background-size: cover;
`;
const GameTarget = styled.div<{ isActive: boolean; position: position }>`
    position: absolute;
    width: ${(props) => (props.isActive ? 50 : 30)}px;
    height: ${(props) => (props.isActive ? 50 : 30)}px;
    left: ${(props) => props.position.x}px;
    top: ${(props) => props.position.y}px;
    ${(props) => (props.isActive ? 'border: 3px solid #ff0000' : '')};
`;
const GameThumbnailImage = styled.img`
    width: 100%;
    height: 50%;
`;
const SymbolNftImage = styled.img`
    width: 100%;
    height: 50%;
`;

const DetailArea = styled.div`
    position: relative;
    top: ${USER_AREA_HEIGht + NAVIGATION_AREA_HEIGHT - 20}px;
    width: 100%;
    height: 31%;
    margin: 0px 4px;
`;

const RankingNumberInfo = styled.div`
    width: 100%;
    height: 15%;
    color: #fff;
`;

const RewardInfo = styled.div`
    width: 100%;
    height: 15%;
    color: #fff;
`;

const RankingSummaryInfo = styled.div`
    width: 100%;
    height: 55%;
    color: #fff;
`;

const DetailButtonArea = styled.div`
    width: 40%;
    height: 15%;
    margin: auto;
`;
