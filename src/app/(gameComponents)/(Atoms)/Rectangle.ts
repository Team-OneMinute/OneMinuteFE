import { PositionPoint, PositionType } from "./const";

type frameStyle = { lineWidth: number, strokeColor: string };
export class Rectangle {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    left: number;
    top: number;
    width: number;
    height: number;
    color: string;
    frameStyle?: frameStyle;

    // constructor
    constructor(
        canvas: HTMLCanvasElement,
        left: number,
        top: number,
        width: number,
        height: number,
    ) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.color = "rgba(198, 198, 198, 1)";
    }

    draw() {
        this.ctx.beginPath();

        // draw fill Square
        this.ctx.rect(this.left, this.top, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

        // draw frame
        if (this.frameStyle) {
            this.ctx.strokeStyle = this.frameStyle.strokeColor;
            this.ctx.lineWidth = this.frameStyle.lineWidth;
            this.ctx.stroke();
        }
    }

    clear() {
        this.ctx.clearRect(this.left, this.top, this.width, this.height);
    }

    setColor(color: string) {
        this.color = color;
    }
    setFrameStyle(style: frameStyle) {
        this.frameStyle = style;
    }
    setPosition(type: PositionType, point: PositionPoint) {
        switch(type) {
            case "margin":
                if (point.left) {
                    this.left = point.left;
                    if (point.right) {
                        this.width = this.canvas.width - point.right - point.left;
                    }
                } else if (point.right) {
                    this.left = this.canvas.width - this.width - point.right;
                }
                if (point.top) {
                    this.top = point.top;
                    if (point.bottom) {
                        this.height = this.canvas.height - point.bottom - point.top;
                    }
                } else if (point.bottom) {
                    this.top = this.canvas.height - this.height - point.bottom;
                }
            break;
        }
    }
}