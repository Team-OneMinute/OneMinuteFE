'use client';
import React, { useContext } from 'react';

import GameCanvas from '@/app/gameComponents/Canvas/GameCanvas';
import GameCanvas2 from '@/app/gameComponents/Canvas/GameCanvas2';

import { useRouter, useSearchParams } from 'next/navigation';

// service
import { getUser } from '@/app/service/user';
import { getGameScoreForSnapOrderScore, transferScoreObj, updateScoreByGameId } from '@/app/service/score';
import { updateRanking, getBeforeRankingNo, getNewRankingNo, isUpRanking } from '@/app/service/ranking';
import TestGameCanvas from '@/app/gameComponents/Canvas/TestGameCanvas';
import { StoreContext } from '@/app/store/StoreProvider';
import { getLoginUser, getUserAuth } from '@/app/service/authentication/userAuthService';

export default function GamePlayingPage() {
    // TODO: 右スワイプでTOP画面に戻れる問題あり
    const router = useRouter();
    const { firebaseAuthStore, web3AuthStore } = useContext(StoreContext);
    const params = useSearchParams();
    const gameId = params.get('id') ?? '';
    const prevScoreStr = params.get('score') ?? '';
    const prevScore = Number(prevScoreStr); // TODO: ストアやキャッシュから取得する

    // after game playing, execute finalization
    const finalize = async (newScore: number) => {
        if (prevScore < newScore) {
            // TODO:認証ができるまでは一旦決め打ち。最終的にはstrage.uidからクレデンシャル引く
            const userAuth = getUserAuth(firebaseAuthStore);
            if (!userAuth) {
                // TODO: add clash report
                return;
            }
            const user = getLoginUser(userAuth);
            const userId = user!.uid;
            // TODO: tmp score
            //const score = newScore;
            const score = 9999;

            // fetch data
            const userData = await getUser(userId);
            const scoreSnap = await getGameScoreForSnapOrderScore(gameId);
            const scoreData = transferScoreObj(scoreSnap);

            await updateScoreByGameId(gameId, score, userId);

            // get Better/After ranking no
            const beforeRankingNo = getBeforeRankingNo(scoreData, userData.userId);
            // FIXME:同点のスコアを取ると、名前順で下の判定をされてしまい、後続のらプール対象になる
            const afterRankingNo = getNewRankingNo(scoreData, score);

            // When updating score, judge ranking updatable
            console.log(`beforeRanking: ${beforeRankingNo}, afterRanking: ${afterRankingNo}`);
            // If even one ranking could be updated
            if (isUpRanking(beforeRankingNo, afterRankingNo)) {
                await updateRanking(gameId, score, userData);
            }
        }
    };

    switch (gameId) {
        case '0001':
            return <TestGameCanvas backAction={() => router.push('/')} finalize={finalize} />;
        case '0002':
            return <TestGameCanvas backAction={() => router.push('/')} finalize={finalize} />;
        case '0003':
            return <TestGameCanvas backAction={() => router.push('/')} finalize={finalize} />;
        default: // TODO: クライアントで設定していないgameId、またはURLにgameIdがない場合の処理
            return <TestGameCanvas backAction={() => router.push('/')} finalize={finalize} />;
    }
}
