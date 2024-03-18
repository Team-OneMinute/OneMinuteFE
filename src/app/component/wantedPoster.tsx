'use client';
import React from 'react';
import styled from 'styled-components';

interface props {
    userImage: string;
    frameNo: string;
}

const WantedPoster: React.FC<props> = ({ userImage, frameNo }) => {
    // TODO:手配書Frameの埋め込み中心部分がずれているので、揃えてから引数で変動させる
    const posterFramPath = '/static/images/wanted/wanted_frame1.png';
    return (
        <PosterArea>
            <PosterFrame src={posterFramPath} />
            <UserImg src={userImage} />
        </PosterArea>
    );
};

const PosterArea = styled.div`
    position: relative;
    width: 100px;
`;

const PosterFrame = styled.img`
    position: relative;
`;

const UserImg = styled.img`
    position: absolute;
    right: 20px;
    bottom: 58px;
`;

export default WantedPoster;
