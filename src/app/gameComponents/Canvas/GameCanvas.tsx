import React, { useEffect, useRef, useState } from 'react';

interface ICharacter {
    x: number;
    y: number;
    width: number;
    height: number;
    vy: number; // Vertical velocity
}

interface ITable {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface IBlock {
    x: number;
    y: number;
    width: number;
    height: number;
    isTouch: boolean;
}

const gravity = 0.1; // 重力加速度
const jumpPower = -7; // ジャンプ力
const groundHeight = 30; // 地面の高さ

const GameCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [character, setCharacter] = useState<ICharacter>({ x: 0, y: 0, width: 50, height: 50, vy: 0 });
    const [table, setTable] = useState<ITable>({ x: 0, y: 0, width: 100, height: 20 });
    const [block, setBlock] = useState<IBlock>({ x: 0, y: 0, width: 50, height: 50, isTouch: false });

    const isTouchObject = (characterY: number, objectY: number, objectHeight: number) => {
        return characterY + character.height > objectY && characterY < objectY + objectHeight;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const loadImage = (src: string): Promise<HTMLImageElement> =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.src = src;
            });

        let characterImage: HTMLImageElement;
        let tableImage: HTMLImageElement;
        let blockImage: HTMLImageElement;
        let prevCharacterY: number;
        let nextCharacterY: number;

        Promise.all([
            loadImage('gameMaterials/mon_052.gif'), // Charactor1
            loadImage('gameMaterials/table.jpg'), // Table1
            loadImage('gameMaterials/block.jpg'), // Block1
        ]).then((images) => {
            [characterImage, tableImage, blockImage] = images;
            const update = () => {
                if (!ctx || !canvas) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const groundY = canvas.height - groundHeight; // 実際の地面のY座標

                // Update and draw block
                // block.x = canvas.width / 2 - block.width / 2;
                if (!block.isTouch) {
                    block.x =
                        (Math.sin((Date.now() / 1000) * 2) * canvas.width) / 4 + (canvas.width / 2 - block.width / 2);
                }
                block.y = canvas.height / 3;
                ctx.drawImage(blockImage, block.x, block.y, block.width, block.height);

                // Update and draw table
                table.x = (Math.sin(Date.now() / 1000) * canvas.width) / 4 + (canvas.width / 2 - table.width / 2); // Move table left and right
                table.y = (canvas.height / 4) * 3;
                ctx.drawImage(tableImage, table.x, table.y, table.width, table.height);

                // Update character position
                character.x = canvas.width / 2 - character.width / 2;
                prevCharacterY = character.y;
                nextCharacterY = prevCharacterY + character.vy;
                character.vy += gravity; // Apply gravity

                // キャラクターの衝突判定
                const inTableX = character.x < table.x + table.width && character.x + character.width > table.x;
                const inBlockX = character.x < block.x + block.width && character.x + character.width > block.x;
                const isStrikeTableFromOn =
                    inTableX &&
                    prevCharacterY + character.height <= table.y &&
                    isTouchObject(nextCharacterY, table.y, table.height);
                const isStrikeBlockFromOn =
                    inBlockX &&
                    prevCharacterY + character.height <= block.y &&
                    isTouchObject(nextCharacterY, block.y, block.height);
                const isStrikeTableFromUnder =
                    inTableX &&
                    prevCharacterY >= table.y + table.height &&
                    isTouchObject(nextCharacterY, table.y, table.height);
                const isStrikeBlockFromUnder =
                    inBlockX &&
                    prevCharacterY >= block.y + block.height &&
                    isTouchObject(nextCharacterY, block.y, block.height);
                if (
                    (prevCharacterY + character.height <= groundY && nextCharacterY + character.height > groundY) ||
                    isStrikeTableFromOn ||
                    isStrikeBlockFromOn
                ) {
                    character.vy = 0;
                    if (isStrikeTableFromOn) {
                        character.y = table.y - character.height;
                    } else if (isStrikeBlockFromOn) {
                        character.y = block.y - character.height;
                    } else {
                        character.y = groundY - character.height;
                    }
                    // character.y = isStrikeTableFromOn ? table.y - character.height : groundY - character.height; // Adjust for character's height
                } else if (isStrikeTableFromUnder) {
                    character.y = table.y + table.height;
                    if (block.isTouch) {
                        block.isTouch = false;
                        console.log('strike table from under');
                    }
                } else if (isStrikeBlockFromUnder) {
                    character.y = block.y + block.height;
                    if (!block.isTouch) {
                        block.isTouch = true;
                        console.log('strike block from under');
                    }
                } else {
                    character.y = nextCharacterY;
                }

                // Draw character
                ctx.drawImage(characterImage, character.x, character.y, character.width, character.height);

                requestAnimationFrame(update);
            };
            update();
        });

        const handleJump = () => {
            character.vy = jumpPower;
        };

        canvas!.addEventListener('click', handleJump);

        return () => {
            canvas!.removeEventListener('click', handleJump);
        };
    }, []);

    useEffect(() => {
        setCharacter((prev) => ({
            ...prev,
            x: window.innerWidth / 2 - prev.width / 2,
            y: window.innerHeight - groundHeight - prev.height,
        }));
        setTable((prev) => ({
            ...prev,
            x: window.innerWidth / 2 - prev.width / 2,
            y: (window.innerHeight / 4) * 3,
        }));
        setBlock((prev) => ({
            ...prev,
            x: window.innerWidth / 2 - prev.width / 2,
            y: 50,
        }));
    }, []);

    return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
};

export default GameCanvas;
