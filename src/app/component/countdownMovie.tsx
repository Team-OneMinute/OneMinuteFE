'use client';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import countdownMovie from '/static/movie/loading/CountDown.mp4';

export const CountDownMovie = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        videoRef.current?.play();
    }, []);
    return (
        <React.StrictMode>
            <video controls muted ref={videoRef}>
                <source src={countdownMovie} type='video/mp4' />
                <p>Your browser doesn't support HTML5 video.</p>
            </video>
        </React.StrictMode>
    );
};

const GameTitle = styled.div`
    margin-bottom: 4px;
    font-weight: bold;
`;
