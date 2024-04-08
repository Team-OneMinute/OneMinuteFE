'use client';
import GameCanvas from '@/app/gameComponents/Canvas/GameCanvas';
import GameCanvas2 from '@/app/gameComponents/Canvas/GameCanvas2';

import { useRouter, useSearchParams } from 'next/navigation';

// service
import { getUser } from '@/app/service/user';
import { getGameScoreForSnapOrderScore, transferScoreObj, updateScoreByGameId } from '@/app/service/score';
import { updateRanking, getBeforeRankingNo, getNewRankingNo, isUpRanking } from '@/app/service/ranking';
import { getCredential } from '@/app/service/authentication/authentication';

export default function GamePlayingPage() {
    // TODO: 右スワイプでTOP画面に戻れる問題あり
    const router = useRouter();

    const params = useSearchParams();
    const gameId = params.get('id') ?? '';
    const prevScoreStr = params.get('score') ?? '';
    const prevScore = Number(prevScoreStr); // TODO: ストアやキャッシュから取得する

    // after game playing, execute finalization
    const finalize = async (newScore: number) => {
        if (prevScore < newScore) {
            // TODO:認証ができるまでは一旦決め打ち。最終的にはstrage.uidからクレデンシャル引く
            const credentials = getCredential();
            const userId = credentials!.uid;
            // TODO: tmp score
            //const score = newScore;
            const score = 9999;

            // fetch data
            const user = await getUser(userId);
            const scoreSnap = await getGameScoreForSnapOrderScore(gameId);
            const scoreData = transferScoreObj(scoreSnap);

            await updateScoreByGameId(gameId, score, userId);

            // get Better/After ranking no
            const beforeRankingNo = getBeforeRankingNo(scoreData, user.userId);
            // FIXME:同点のスコアを取ると、名前順で下の判定をされてしまい、後続のらプール対象になる
            const afterRankingNo = getNewRankingNo(scoreData, score);

            // When updating score, judge ranking updatable
            console.log(`beforeRanking: ${beforeRankingNo}, afterRanking: ${afterRankingNo}`);
            // If even one ranking could be updated
            if (isUpRanking(beforeRankingNo, afterRankingNo)) {
                await updateRanking(gameId, score, user);
            }
        }
    };

    switch (gameId) {
        case '0001':
            return <GameCanvas />;
        case '0002':
            return <GameCanvas2 backAction={() => router.push('/')} finalize={finalize} />;
        case '0003':
            return <GameCanvas />;
        default: // TODO: クライアントで設定していないgameId、またはURLにgameIdがない場合の処理
            return <GameCanvas />;
    }
}
