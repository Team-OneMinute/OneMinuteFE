interface CharacterSet {
    character1: Character;
    character2: Character;
}

export interface TouchVector {
    left: boolean;
    top: boolean;
    right: boolean;
    bottom: boolean;
}

export class Character {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
    vx: number;
    vy: number;
    constructor(
        canvas: HTMLCanvasElement,
        left: number,
        top: number,
        width: number,
        height: number,
        vx: number,
        vy: number,
    ) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.left = left;
        this.right = left + width;
        this.top = top;
        this.bottom = top + height;
        this.width = width;
        this.height = height;
        this.vx = vx;
        this.vy = vy;
    }

    setLeft(left: number) {
        this.left = left;
        this.right = left + this.width;
    }
    setRight(right: number) {
        this.right = right;
        this.left = right - this.width;
    }
    setTop(top: number) {
        this.top = top;
        this.bottom = top + this.height;
    }
    setBottom(bottom: number) {
        this.bottom = bottom;
        this.top = bottom - this.height;
    }
    setVector(vx: number, vy: number) {
        this.vx = vx;
        this.vy = vy;
    }
    naturalMove() {
        this.left += this.vx;
        this.right += this.vx;
        this.top += this.vy;
        this.bottom += this.vy;
    }
    accelerate(ax: number, ay: number) {
        this.vx += ax;
        this.vy += ay;
    }
    isLand(groundY: number): boolean {
        const next = getNextCharacter(this);
        return this.bottom <= groundY && next.bottom > groundY;
    }
    whereTouch(target: Character): TouchVector {
        const nextMyCharacter = getNextCharacter(this);
        const nextTargetCharacter = getNextCharacter(target);
        const prev = { character1: this, character2: target } as CharacterSet;
        const next = { character1: nextMyCharacter, character2: nextTargetCharacter } as CharacterSet;
        const isLeftTouch = isLeft(prev) && isInRangeX(next) && isInRangeY(next);
        const isRightTouch = isRight(prev) && isInRangeX(next) && isInRangeY(next);
        const isTopTouch = isOn(prev) && isInRangeX(next) && isInRangeY(next);
        const isBottomTouch = isUnder(prev) && isInRangeX(next) && isInRangeY(next);
        return {
            left: isLeftTouch,
            top: isTopTouch,
            right: isRightTouch,
            bottom: isBottomTouch,
        } as TouchVector;
    }
}

const getNextCharacter = (character: Character): Character => {
    const next = {
        ...character,
        left: character.left + character.vx,
        right: character.right + character.vx,
        top: character.top + character.vy,
        bottom: character.bottom + character.vy,
    } as Character;
    return next;
}

const isLeft = (set: CharacterSet): boolean => {
    return set.character1.right <= set.character2.left;
}
const isRight = (set: CharacterSet): boolean => {
    return set.character1.left >= set.character2.right;
}
const isOn = (set: CharacterSet): boolean => {
    return set.character1.bottom <= set.character2.top;
}
const isUnder = (set: CharacterSet): boolean => {
    return set.character1.top >= set.character2.bottom;
}
const isInRangeX = (set: CharacterSet): boolean => {
    return !isLeft(set) && !isRight(set);
};
const isInRangeY = (set: CharacterSet): boolean => {
    return !isOn(set) && !isUnder(set);
};
