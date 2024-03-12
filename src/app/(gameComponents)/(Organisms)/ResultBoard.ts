import { Rectangle } from "../(Atoms)/Rectangle";
import { Text } from "../(Atoms)/Text";
import { Button } from "../(Molecules)/Button";

export class ResultBoard {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    rectangle: Rectangle;
    text: Text;
    backButton: Button;
    retryButton: Button;

    // constructor
    constructor(
        canvas: HTMLCanvasElement,
        backAction: () => void,
        retryAction: () => void,
    ) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.width = canvas.width / 4 * 3;
        this.height = canvas.height / 4 * 3;

        this.rectangle = new Rectangle(canvas, canvas.width / 4, canvas.height / 4, this.width, this.height);
        this.rectangle.setPosition("margin", {left: canvas.width / 8, top: canvas.height / 8});

        this.text = new Text(canvas, 0, this.rectangle.top + 20, "top");

        this.backButton = new Button(canvas, 0, 0, 70, 35, backAction, "back");
        this.backButton.setPosition("margin", {right: canvas.width / 2 + 10, bottom: this.canvas.height - (this.rectangle.top + this.rectangle.height) + 20});
        this.retryButton = new Button(canvas, 0, 0, 70, 35, retryAction, "retry");
        this.retryButton.setPosition("margin", {left: canvas.width / 2 + 10, bottom: this.canvas.height - (this.rectangle.top + this.rectangle.height) + 20});
    }

    draw(tryCount: number) {
        this.rectangle.setFrameStyle({lineWidth: 2, strokeColor: "black"});
        this.rectangle.draw();

        this.text.setText(`Try: ${tryCount}`);
        this.text.alignCenter(this.rectangle.left, this.rectangle.left + this.rectangle.width);
        this.text.draw();

        this.backButton.draw();
        this.retryButton.draw();
    }

    clear() {
        this.ctx.clearRect(this.rectangle.left, this.rectangle.top, this.rectangle.width, this.rectangle.height);
    }
}