import getStroke from "perfect-freehand";
import { ElementType } from "../types";

export const drawElement = (
  roughCanvas: any,
  context: CanvasRenderingContext2D,
  element: ElementType
) => {
  switch (element.type) {
    case "line":
    case "rectangle":
    case "circle":
    case "diamond":
    case "frame":
    case "layers":
      roughCanvas.draw(element.roughElement);
      break;

    case "arrow": {
      roughCanvas.draw(element.roughElement);
      drawArrowhead(context, element.x1, element.y1, element.x2, element.y2);
      break;
    }

    case "pencil": {
      if (!element.points) {
        throw new Error("Pencil element points are undefined");
      }

      const strokePoints = getStroke(element.points);
      const formattedPoints: [number, number][] = strokePoints.map((point) => {
        if (point.length !== 2) {
          throw new Error(
            `Expected point to have exactly 2 elements, got ${point.length}`
          );
        }
        return [point[0], point[1]];
      });

      const stroke = getSvgPathFromStroke(formattedPoints);
      context.fillStyle = element.color || "#000000";
      context.fill(new Path2D(stroke));
      break;
    }

    case "text": {
      context.textBaseline = "top";
      context.font = "24px sans-serif";
      const text = element.text || "";
      context.fillText(text, element.x1, element.y1);
      break;
    }

    case "image": {
      if (!element.src) return;
      const image = new Image();
      image.src = element.src;
      image.onload = () => {
        context.drawImage(image, element.x1, element.y1, element.x2 - element.x1, element.y2 - element.y1);
      };
      break;
    }

    default:
      throw new Error(`Type not recognised: ${element.type}`);
  }
};

const getSvgPathFromStroke = (stroke: [number, number][]) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (
      acc: string[],
      [x0, y0]: [number, number],
      i: number,
      arr: [number, number][]
    ) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(
        x0.toString(),
        y0.toString(),
        ((x0 + x1) / 2).toString(),
        ((y0 + y1) / 2).toString()
      );
      return acc;
    },
    ["M", ...stroke[0].map((num) => num.toString()), "Q"]
  );

  d.push("Z");
  return d.join(" ");
};

// Utility to draw an arrowhead at the end of a line
const drawArrowhead = (
  context: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const headlen = 10;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  context.beginPath();
  context.moveTo(x2, y2);
  context.lineTo(
    x2 - headlen * Math.cos(angle - Math.PI / 6),
    y2 - headlen * Math.sin(angle - Math.PI / 6)
  );
  context.lineTo(
    x2 - headlen * Math.cos(angle + Math.PI / 6),
    y2 - headlen * Math.sin(angle + Math.PI / 6)
  );
  context.closePath();
  context.fill();
};
