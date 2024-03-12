import React, { useEffect, useRef, useState } from 'react';
import { Character, TouchVector } from '../(Atoms)/Character';
import { ScoreBoard } from '../(Organisms)/ScoreBoard';
import { ResultBoard } from '../(Organisms)/ResultBoard';

const gravity = 0.1; // 重力加速度
const groundHeight = 30; // 地面の高さ
const jumpPower = -7; // ジャンプ力

interface Props {
  backAction: () => void;
}

const GameCanvas2: React.FC<Props> = ({ backAction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const didLogRef = useRef<boolean>(false);
  const [tryCount, setTryCount] = useState<number>(1);
  let score: number = 0;
  let isPlaying = true;
  let animationId: number | null = null;

  const loadImage = (src: string): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });

  useEffect(() => {
    if (didLogRef.current === false) {
      didLogRef.current = true;
    } else {
      console.log("useEffect");
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx || !canvas) return;

      const retryAction = () => {
        setTryCount(tryCount + 1);
        canvas.removeEventListener('click', onClick);
      }

      const character = new Character(canvas, canvas.width / 4 - 50 / 2, canvas.height - groundHeight - 50, 50, 50, 0, 0);
      const block = new Character(canvas, canvas.width, canvas.height - groundHeight - 50, 50, 50, -1, 0);
      const scoreBoard = new ScoreBoard(canvas, 200, 50);
      const resultBoard = new ResultBoard(canvas, backAction, retryAction);

      const onClick = (e: MouseEvent) => {
        if (isPlaying) {
          // jump
          character.setVector(0, jumpPower);
        } else {
          resultBoard.backButton.onClick(e);
          resultBoard.retryButton.onClick(e);
        }
      };
      const gameOver = () => {
        console.log("game over");
        if (isPlaying) {
          isPlaying = false;
          scoreBoard.draw(score);
        }
      };

      let backgroundImage: HTMLImageElement;
      let characterImage: HTMLImageElement;
      let blockImage: HTMLImageElement;

      Promise.all([
        loadImage('static/images/background/background3.png'), // Background
        loadImage('gameMaterials/mon_052.gif'), // Character
        loadImage('gameMaterials/block.jpg'), // Block
      ]).then(images => {
        [backgroundImage, characterImage, blockImage] = images;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const update = () => {
          // game over logic
          if (!isPlaying && animationId != null) {
            cancelAnimationFrame(animationId);

            // result board draw
            resultBoard.draw(tryCount);

            return;
          }

          // background image draw
          ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
          // score board draw
          scoreBoard.draw(score);

          const groundY = canvas.height - groundHeight; // 実際の地面のY座標

          // reset block position
          if (block.right < 0) {
            block.setLeft(canvas.width);
          }

          // Update block position
          block.naturalMove();
          ctx.drawImage(blockImage, block.left, block.top, block.width, block.height);

          // Update character position
          const touchVector: TouchVector = character.whereTouch(block);
          if (touchVector.top) {
            character.setBottom(block.top);
          } else if (touchVector.left) {
            gameOver();
          } else if (character.isLand(groundY)) {
            character.setBottom(groundY);
          } else {
            character.naturalMove();
            character.accelerate(0, gravity);
          }
          ctx.drawImage(characterImage, character.left, character.top, character.width, character.height);

          // score logic
          score++;

          animationId = requestAnimationFrame(update);
        };
        update();
      });

      canvas.addEventListener('click', onClick);

      return () => {
        canvas.removeEventListener('click', onClick);
      };
    }
  }, [tryCount]);

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
};

export default GameCanvas2;