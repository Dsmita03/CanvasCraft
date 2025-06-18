import rough from "roughjs";
import { Tools, ElementType, ToolsType } from "../types";

export const createElement = (
  id: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  type: ToolsType,
  color?: string
): ElementType => {
  const generator = rough.generator();

  switch (type) {
    case Tools.line:
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        roughElement: generator.line(x1, y1, x2, y2),
      };

    case Tools.rectangle:
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        roughElement: generator.rectangle(x1, y1, x2 - x1, y2 - y1),
      };

    case Tools.circle: {
      const radiusX = Math.abs(x2 - x1) / 2;
      const radiusY = Math.abs(y2 - y1) / 2;
      const centerX = (x1 + x2) / 2;
      const centerY = (y1 + y2) / 2;
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        roughElement: generator.ellipse(centerX, centerY, radiusX * 2, radiusY * 2),
      };
    }

    case Tools.diamond: {
      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2;
      const points: [number, number][] = [
        [cx, y1],
        [x2, cy],
        [cx, y2],
        [x1, cy],
      ];
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        roughElement: generator.polygon(points),
      };
    }

    case Tools.arrow: {
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        roughElement: generator.line(x1, y1, x2, y2),
      };
    }

    case Tools.pencil:
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        points: [{ x: x1, y: y1 }],
        roughElement: null,
        color: color ?? "#000000",
      };

    case Tools.text:
      return { id, type, x1, y1, x2, y2, text: "" };

    case Tools.image:
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        src: "", // Placeholder, user will provide later
      };

    case Tools.frame:
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        roughElement: generator.rectangle(x1, y1, x2 - x1, y2 - y1),
      };
    case Tools.layers:
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        roughElement: generator.rectangle(x1, y1, x2 - x1, y2 - y1),
      };

    default:
      throw new Error(`Element type not recognised: ${type}`);
  }
};
