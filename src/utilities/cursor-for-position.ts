type PositionType =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "start"
  | "end"
  | "inside"
  | string; // Fallback to string to handle unknowns defensively

export const cursorForPosition = (position: PositionType): string => {
  switch (position) {
    case "topLeft":
    case "bottomRight":
      return "nwse-resize";

    case "topRight":
    case "bottomLeft":
      return "nesw-resize";

    case "start":
    case "end":
    case "inside":
      return "move";

    default:
      return "default";
  }
};
