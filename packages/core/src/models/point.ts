import { Direction } from './direction';
import { AnchorMode } from './status';

export class Point {
  // The id is nodeId while the point is from or to of a line.
  id: number | string;
  direction: Direction;
  // The index of docker anchor on node.
  radius: number;
  strokeStyle: string;
  fillStyle: string;
  hoverFillStyle: string;
  hoverStrokeStyle: string;
  anchorIndex: number;
  autoAnchor: boolean;
  hidden: boolean;
  mode: AnchorMode;
  data: any;
  constructor(
    public x: number,
    public y: number,
    direction?: Direction,
    anchorIndex?: number,
    id?: number | string,
    hidden?: boolean,
    mode?: AnchorMode,
    radius?: number,
    strokeStyle?: string,
    fillStyle?: string,
    hoverFillStyle?: string,
    hoverStrokeStyle?: string,
    data?: any,
    autoAnchor?: boolean
  ) {
    this.direction = direction;
    this.anchorIndex = anchorIndex;
    this.id = id;
    this.hidden = hidden;
    this.mode = mode;
    this.radius = radius;
    this.strokeStyle = strokeStyle;
    this.fillStyle = fillStyle;
    this.hoverFillStyle = hoverFillStyle;
    this.hoverStrokeStyle = hoverStrokeStyle;
    this.data = data;
    this.autoAnchor = autoAnchor;
  }

  floor() {
    this.x |= 0;
    this.y |= 0;
  }

  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
  }

  clone(): Point {
    const pt = new Point(
      this.x,
      this.y,
      this.direction,
      this.anchorIndex,
      this.id,
      this.hidden,
      this.mode,
      this.radius,
      this.strokeStyle,
      this.fillStyle,
      this.hoverFillStyle,
      this.hoverStrokeStyle,
      this.autoAnchor
    );
    if (this.data) {
      pt.data = this.data;
    }
    if (this.mode) {
      pt.mode = this.mode;
    }
    return pt;
  }

  hit(pt: { x: number; y: number }, radius = 5) {
    return pt.x > this.x - radius && pt.x < this.x + radius && pt.y > this.y - radius && pt.y < this.y + radius;
  }

  rotate(angle: number, center: { x: number; y: number }): Point {
    if (!angle || angle === 360) {
      return this;
    }

    angle *= Math.PI / 180;
    const x = (this.x - center.x) * Math.cos(angle) - (this.y - center.y) * Math.sin(angle) + center.x;
    const y = (this.x - center.x) * Math.sin(angle) + (this.y - center.y) * Math.cos(angle) + center.y;
    this.x = x;
    this.y = y;
    return this;
  }

  isSameAs(pt: Point) {
    return this.anchorIndex === pt.anchorIndex && this.direction === pt.direction && this.id === pt.id;
  }
}

(window as any).topologyPoint = Point;
