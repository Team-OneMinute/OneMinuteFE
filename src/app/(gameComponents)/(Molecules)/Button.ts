import { Rectangle } from "../(Atoms)/Rectangle";
import { Text } from "../(Atoms)/Text";
import { PositionPoint, PositionType } from "../(Atoms)/const";

export class Button {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    rectangle: Rectangle;
    text: Text;
    clickAction: () => void;

    // constructor
    constructor(
        canvas: HTMLCanvasElement,
        left: number,
        top: number,
        width: number,
        height: number,
        clickAction: () => void,
        text?: string,
    ) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;

        this.rectangle = new Rectangle(canvas, left, top, width, height);
        this.rectangle.setFrameStyle({lineWidth: 2, strokeColor: "black"});
        this.text = new Text(canvas, left, top + height / 2, "middle", text);
        this.text.alignCenter(this.rectangle.left, this.rectangle.left + this.rectangle.width);
        this.clickAction = clickAction;
    }

    draw() {
        this.rectangle.draw();
        this.text.draw();
    }

    clear() {
        this.ctx.clearRect(this.rectangle.left, this.rectangle.top, this.rectangle.width, this.rectangle.height);
    }

    onClick(e: MouseEvent) {
        const canvasRect = this.canvas.getBoundingClientRect()
        const clickX = e.clientX - canvasRect.x;
        const clickY = e.clientY - canvasRect.y;
        if (this.rectangle.left <= clickX && clickX <= this.rectangle.left + this.rectangle.width
            && this.rectangle.top <= clickY && clickY <= this.rectangle.top + this.rectangle.height) {
                this.clickAction();
        }
    }

    setPosition(type: PositionType, point: PositionPoint) {
        this.rectangle.setPosition(type, point);
        this.text.setBaseLine(this.rectangle.top + this.rectangle.height / 2);
        this.text.alignCenter(this.rectangle.left, this.rectangle.left + this.rectangle.width);
    }
}