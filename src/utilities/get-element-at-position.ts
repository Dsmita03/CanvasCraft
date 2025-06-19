import { nearPoint } from ".";
import { ElementType, Tools } from "../types";

type Point = { x: number; y: number };
type Position =
  | "start"
  | "end"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "inside"
  | null;

export const getElementAtPosition = (
  x: number,
  y: number,
  elements: ElementType[]
): (ElementType & { position: Position }) | undefined => {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element) => element.position !== null);
};

const positionWithinElement = (
  x: number,
  y: number,
  element: ElementType
): Position => {
  const { type, x1, x2, y1, y2 } = element;

  const [minX, maxX] = [Math.min(x1, x2), Math.max(x1, x2)];
  const [minY, maxY] = [Math.min(y1, y2), Math.max(y1, y2)];

  switch (type) {
    case Tools.line: {
      const on = onLine(x1, y1, x2, y2, x, y);
      return (nearPoint(x, y, x1, y1, "start") as Position) ||
        (nearPoint(x, y, x2, y2, "end") as Position) ||
        on;
    }

    case Tools.rectangle: {
      return (
        nearPoint(x, y, x1, y1, "topLeft") as Position ||
        nearPoint(x, y, x2, y1, "topRight") as Position ||
        nearPoint(x, y, x1, y2, "bottomLeft") as Position ||
        nearPoint(x, y, x2, y2, "bottomRight") as Position ||
        (x >= minX && x <= maxX && y >= minY && y <= maxY ? "inside" : null)
      );
    }

    case Tools.pencil: {
      const points = element.points || [];
      for (let i = 0; i < points.length - 1; i++) {
        if (onLine(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, x, y, 5)) {
          return "inside";
        }
      }
      return null;
    }

    case Tools.text:
      return x >= minX && x <= maxX && y >= minY && y <= maxY ? "inside" : null;

    default:
      throw new Error(`Unknown element type: ${type}`);
  }
};

const onLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number,
  y: number,
  maxDist = 1
): "inside" | null => {
  const a: Point = { x: x1, y: y1 };
  const b: Point = { x: x2, y: y2 };
  const c: Point = { x, y };

  const lengthAB = distance(a, b);
  const distanceAC = distance(a, c);
  const distanceBC = distance(b, c);

  const offset = lengthAB - (distanceAC + distanceBC);
  return Math.abs(offset) < maxDist ? "inside" : null;
};

const distance = (a: Point, b: Point): number =>
  Math.hypot(a.x - b.x, a.y - b.y);
