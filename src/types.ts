import { Drawable } from "roughjs/bin/core";

export type Point = { x: number; y: number };

// === TOOL DEFINITIONS ===

export const Tools = {
  lock: "lock",
  pan: "pan",
  selection: "selection",
  rectangle: "rectangle",
  diamond: "diamond",
  circle: "circle",
  arrow: "arrow",
  line: "line",
  pencil: "pencil",
  text: "text",
  image: "image",
  eraser: "eraser",
  frame: "frame",
  laser: "laser",
  layers: "layers",
  more: "more",
} as const;

export type ToolsType = keyof typeof Tools;

export const MainTools: ToolsType[] = [
  "selection",
  "rectangle",
  "diamond",
  "circle",
  "arrow",
  "line",
  "pencil",
  "text",
  "eraser",
  "pan",
];

export const ExtraTools: ToolsType[] = [
  "image",
  "layers",
  "lock",
];

// === ACTION STATE ===

export type ActionsType =
  | "none"
  | "writing"
  | "drawing"
  | "moving"
  | "panning"
  | "resizing";

// === ELEMENT TYPES ===

type ElementBase = {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: ToolsType;
  position?: string | null;
  offsetX?: number;
  offsetY?: number;
};

export type RoughShapeElement = ElementBase & {
  roughElement: Drawable;
};

export type PencilElement = ElementBase & {
  type: "pencil";
  points: Point[];
  color: string;
  roughElement?: null;
};

export type TextElement = ElementBase & {
  type: "text";
  text: string;
};

export type ShapeElement = RoughShapeElement & {
  type: "rectangle" | "diamond" | "circle" | "arrow" | "line";
};

export type FrameElement = RoughShapeElement & {
  type: "frame";
};

export type LayersElement = RoughShapeElement & {
  type: "layers";
};

export type EraserElement = ElementBase & {
  type: "eraser";
};

export type ImageElement = ElementBase & {
  type: "image";
  src?: string;
};

// === FINAL ELEMENT TYPE ===

export type ElementType =
  | PencilElement
  | TextElement
  | ShapeElement
  | FrameElement
  | LayersElement
  | EraserElement
  | ImageElement;

// === INTERACTION TYPES ===

export type SelectedElementType = ElementType & {
  xOffsets?: number[];
  yOffsets?: number[];
};

export type ExtendedElementType = ElementType & {
  xOffsets?: number[];
  yOffsets?: number[];
};
