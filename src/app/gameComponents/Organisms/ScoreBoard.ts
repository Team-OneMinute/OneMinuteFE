import { Rectangle } from '@/app/gameComponents/Atoms/Rectangle';
import { Text } from '@/app/gameComponents/Atoms/Text';

export class ScoreBoard {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    rectangle: Rectangle;
    text: Text;

    // constructor
    constructor(canvas: HTMLCanvasElement, width: number, height: number) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.width = width;
        this.height = height;

        this.rectangle = new Rectangle(canvas, 0, 0, width, height);
        this.rectangle.setPosition('margin', { right: 20, top: 20 });

        this.text = new Text(canvas, 0, this.rectangle.top + this.rectangle.height / 2, 'middle');
        this.text.setLeft(this.rectangle.left + 20);
    }

    draw(score: number) {
        this.rectangle.setFrameStyle({ lineWidth: 2, strokeColor: 'black' });
        this.rectangle.draw();

        this.text.setText(`Score: ${score}`);
        // this.text.alignCenter(this.rectangle.left, this.rectangle.left + this.rectangle.width);
        this.text.draw();
    }

    clear() {
        this.ctx.clearRect(this.rectangle.left, this.rectangle.top, this.rectangle.width, this.rectangle.height);
    }
}
