import React, { useRef, useEffect } from 'react';

interface Character {
  x: number;
  y: number;
  vy: number;
  gravity: number;
}

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const character: Character = { x: 100, y: 100, vy: 0, gravity: 0.2 };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      const characterImage = new Image();
      characterImage.src = 'gameMaterials/mon_052.gif'; // Adjust the path as needed
      characterImage.onload = () => {
        const draw = () => {
          if (!ctx || !canvas) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          character.y += character.vy;
          if (character.y > canvas.height - characterImage.height / 2) {
            character.y = canvas.height - characterImage.height / 2;
            character.vy = 0;
          } else {
            character.vy += character.gravity;
          }
          ctx.drawImage(characterImage, character.x, character.y, characterImage.width / 2, characterImage.height / 2);
          requestAnimationFrame(draw);
        };
        draw();
      };

      canvas!.addEventListener('click', () => {
        character.vy = -10; // Adjust the jump speed as needed
      });
    }
  }, []);

  return <canvas ref={canvasRef} width={640} height={480} />;
};

export default GameCanvas;