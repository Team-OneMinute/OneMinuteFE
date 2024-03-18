/**
 * Canvasに表示する「テキストのみ」のコンポーネント
 */

type alignMode = "top" | "middle" | "bottom";

export class Text {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    left: number;
    text: string;
    baseLineY: number;
    align: alignMode;
    font: string;
    fontSize: number;
    fontStyle: string;
    color: string;

    // constructor
    constructor(
        canvas: HTMLCanvasElement,
        left: number,
        baseLineY: number,
        align: alignMode,
        text?: string,
    ) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.left = left;
        this.text = text || "text";
        this.baseLineY = baseLineY;
        this.align = align;
        this.font = "24px serif";
        this.fontSize = 24;
        this.fontStyle = "serif";
        this.color = "rgba(0, 0, 0, 1)";
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.font = this.font;
        this.ctx.textBaseline = this.align;
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(this.text, this.left, this.baseLineY);
    }

    setLeft(left: number) {
        this.left = left;
    }
    setText(text: string) {
        this.text = text;
    }
    setBaseLine(baseLine: number) {
        this.baseLineY = baseLine;
    }
    setFontSize(size: number) {
        this.fontSize = size;
        this.setFont(`${size}px ${this.fontStyle}`);
    }
    setFontStyle(style: string) {
        this.fontStyle = style;
        this.setFont(`${this.fontSize}px ${style}`);
    }
    setFont(font: string) {
        this.font = font;
    }
    setColor(color: string) {
        this.color = color;
    }
    getSize() {
        this.ctx.beginPath();
        this.ctx.font = this.font;
        this.ctx.textBaseline = this.align;
        const measure = this.ctx.measureText(this.text);
        const width = measure.width;
        let height: number;
        switch (this.align) {
            case "top":
                height = measure.actualBoundingBoxDescent;
                break;
            case "middle":
                height = measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent;
                break;
            case "bottom":
                height = measure.actualBoundingBoxAscent;
                break;
            default:
                height = this.fontSize;
                break;
        }
        return { width: width, height: height };
    }
    getCenter() {
        this.ctx.beginPath();
        this.ctx.font = this.font;
        this.ctx.textBaseline = this.align;
        const width = this.ctx.measureText(this.text).width;
        return this.left + width / 2;
    }

    alignCenter(areaLeft: number, areaRight: number) {
        const areaCenter = (areaLeft + areaRight) / 2;
        const textCenter = this.getCenter();
        const diff = areaCenter - textCenter;
        this.left += diff;
    }
}