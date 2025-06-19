// Imports
import {
  MouseEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  FocusEvent,
} from "react";
import rough from "roughjs";

import { useIsMobile } from "./hooks/useIsMobile";
import { useHistory } from "./hooks/useHistory";
import { usePressedKeys } from "./hooks/usePressedKeys";

import Sidebar from "./components/sidebar/Sidebar";
import HelpPage from "./components/HelpPage/HelpPage";
import { ActionBar, ControlPanel, Info } from "./components";

import {
  ToolsType,
  ActionsType,
  PencilElement,
  TextElement,
  SelectedElementType,
  ExtendedElementType,
  Tools,
} from "./types";

import {
  adjustElementCoordinates,
  adjustmentRequired,
  createElement,
  cursorForPosition,
  drawElement,
  getElementAtPosition,
  resizedCoordinates,
} from "./utilities";

import "./App.css";

// Constants
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 4;

// Component
export default function App() {
  const isMobile = useIsMobile();
  const { elements, setElements, undo, redo } = useHistory([]);

  const [tool, setTool] = useState<ToolsType>(Tools.selection);
  const [action, setAction] = useState<ActionsType>("none");
  const [selectedElement, setSelectedElement] = useState<SelectedElementType | null>(null);

  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [scaleOffset, setScaleOffset] = useState({ x: 0, y: 0 });

  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const [textValue, setTextValue] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const pressed = usePressedKeys();

  const [laserPoints, setLaserPoints] = useState<{ x: number; y: number }[]>([]);

  // Theme setup
  useEffect(() => {
    const storedTheme = localStorage.getItem("freehandx-theme");
    if (storedTheme) setDarkMode(storedTheme === "dark");
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("freehandx-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Canvas drawing
  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const roughCanvas = rough.canvas(canvas);
    const bg = getComputedStyle(document.documentElement).getPropertyValue("--canvas-bg").trim();

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const sw = canvas.width * scale;
    const sh = canvas.height * scale;
    const sx = (sw - canvas.width) / 2;
    const sy = (sh - canvas.height) / 2;

    setScaleOffset({ x: sx, y: sy });

    ctx.save();
    ctx.translate(panOffset.x * scale - sx, panOffset.y * scale - sy);
    ctx.scale(scale, scale);

    elements.forEach((el) => {
      if (!(action === "writing" && selectedElement?.id === el.id)) {
        drawElement(roughCanvas, ctx, el);
      }
    });

    // Draw laser stroke
    if (tool === Tools.laser && laserPoints.length > 1) {
      ctx.strokeStyle = "rgba(255, 0, 0, 0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(laserPoints[0].x, laserPoints[0].y);
      for (let i = 1; i < laserPoints.length; i++) {
        ctx.lineTo(laserPoints[i].x, laserPoints[i].y);
      }
      ctx.stroke();
    }

    ctx.restore();
  }, [elements, action, selectedElement, panOffset, scale, tool, laserPoints]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && document.activeElement?.tagName !== "TEXTAREA") {
        if (e.key === "z") (e.shiftKey ? redo : undo)();
        else if (e.key === "y") redo();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [undo, redo]);

  // Scroll / Zoom
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (pressed.has("Control") || pressed.has("Meta")) {
        e.preventDefault();
        zoom(-e.deltaY * 0.01);
      } else {
        setPanOffset((p) => ({ x: p.x - e.deltaX, y: p.y - e.deltaY }));
      }
    };
    document.addEventListener("wheel", onWheel, { passive: false });
    return () => document.removeEventListener("wheel", onWheel);
  }, [pressed]);

  useEffect(() => {
    if (action === "writing" && textRef.current && selectedElement?.type === Tools.text) {
      setTextValue(selectedElement.text || "");
      setTimeout(() => textRef.current?.focus(), 0);
    }
  }, [action, selectedElement]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const handleThemeChange = (value: string) => setDarkMode(value === "dark");

  const setCanvasBg = (color: string) => {
    document.documentElement.style.setProperty("--canvas-bg", color);
  };

  const handleOpenFile = () => alert("File open feature not implemented yet.");

  const handleSaveFile = () => {
    const data = JSON.stringify(elements);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "canvas.json";
    a.click();
  };

  const handleExportImage = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleResetCanvas = () => setElements([], true);

  const zoom = (delta: number) => {
    setScale((prev) => Math.min(Math.max(prev + delta, MIN_ZOOM), MAX_ZOOM));
  };

  const getCoors = (e: MouseEvent<HTMLCanvasElement>) => ({
    clientX: (e.clientX - panOffset.x * scale + scaleOffset.x) / scale,
    clientY: (e.clientY - panOffset.y * scale + scaleOffset.y) / scale,
  });

  const update = (
    id: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    type: ToolsType,
    textOpt?: string
  ) => {
    setElements((prev) => {
      const cp = [...prev];
      if (type === Tools.text) {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d")!;
        const txt = textOpt ?? (cp[id] as TextElement).text ?? "";
        const width = ctx.measureText(txt).width;
        const textEl = cp[id] as TextElement;
        textEl.text = txt;
        textEl.x2 = textEl.x1 + width;
        textEl.y2 = textEl.y1 + 24;
      } else {
        cp[id] =
          type === Tools.pencil
            ? ((cp[id] as PencilElement).points.push({ x: x2, y: y2 }), cp[id])
            : createElement(id, x1, y1, x2, y2, type);
      }
      return cp;
    }, true);
  };

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (action === "writing") return;

    const { clientX, clientY } = getCoors(e);

    if (tool === Tools.eraser) {
      const el = getElementAtPosition(clientX, clientY, elements);
      if (el) setElements((p) => p.filter((e) => e.id !== el.id), true);
      return;
    }

    if (tool === Tools.pan || e.button === 1 || pressed.has(" ")) {
      setAction("panning");
      setStartPan({ x: clientX, y: clientY });
      document.body.style.cursor = "grabbing";
      return;
    }

    if (tool === Tools.selection) {
      const el = getElementAtPosition(clientX, clientY, elements);
      if (el) {
        const sel: SelectedElementType = {
          ...el,
          ...(el.type === Tools.pencil
            ? {
                xOffsets: el.points.map((p) => clientX - p.x),
                yOffsets: el.points.map((p) => clientY - p.y),
              }
            : { offsetX: clientX - el.x1, offsetY: clientY - el.y1 }),
        };
        setSelectedElement(sel);
        setAction(el.position === "inside" ? "moving" : "resizing");
        return;
      }
    }

    if (tool === Tools.laser) {
      setLaserPoints([{ x: clientX, y: clientY }]);
      return;
    }

    const id = elements.length;
    const color = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim();
    const newEl = createElement(id, clientX, clientY, clientX, clientY, tool, color);

    setElements((prev) => [...prev, newEl]);
    setSelectedElement(newEl);
    setAction(tool === Tools.text ? "writing" : "drawing");
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = getCoors(e);

    if (tool === Tools.laser && e.buttons === 1) {
      setLaserPoints((prev) => {
        const updated = [...prev, { x: clientX, y: clientY }];
        return updated.slice(-100);
      });
      return;
    }

    if (tool === Tools.eraser && e.buttons === 1) {
      const el = getElementAtPosition(clientX, clientY, elements);
      if (el) setElements((p) => p.filter((e) => e.id !== el.id), true);
      return;
    }

    if (action === "panning") {
      setPanOffset((p) => ({
        x: p.x + clientX - startPan.x,
        y: p.y + clientY - startPan.y,
      }));
      return;
    }

    if (tool === Tools.selection) {
      const el = getElementAtPosition(clientX, clientY, elements);
      (e.target as HTMLElement).style.cursor = el?.position
        ? cursorForPosition(el.position)
        : "default";
    }

    if (action === "drawing") {
      const i = elements.length - 1;
      const { x1, y1, type } = elements[i];
      update(i, x1, y1, clientX, clientY, type);
    }

    if (action === "moving" && selectedElement) {
      const idx = selectedElement.id;
      if (selectedElement.type === Tools.pencil) {
        const p = selectedElement as SelectedElementType & PencilElement;
        const newPts = p.points.map((_, i) => ({
          x: clientX - p.xOffsets![i],
          y: clientY - p.yOffsets![i],
        }));
        setElements((prev) => {
          const cp = [...prev];
          (cp[idx] as PencilElement).points = newPts;
          return cp;
        }, true);
      } else {
        const dx = clientX - (selectedElement.offsetX ?? 0);
        const dy = clientY - (selectedElement.offsetY ?? 0);
        update(
          idx,
          dx,
          dy,
          dx + selectedElement.x2 - selectedElement.x1,
          dy + selectedElement.y2 - selectedElement.y1,
          selectedElement.type,
          selectedElement.type === Tools.text ? (selectedElement as TextElement).text : undefined
        );
      }
    }

    if (action === "resizing" && selectedElement?.position) {
      const se = selectedElement as ExtendedElementType;
      const { x1, y1, x2, y2 } = resizedCoordinates(clientX, clientY, se.position ?? "unknown", se);
      update(se.id, x1, y1, x2, y2, se.type);
    }
  };

  const handleMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = getCoors(e);

    if (tool === Tools.laser) {
      setTimeout(() => setLaserPoints([]), 300);
      return;
    }

    if (selectedElement) {
      const el = elements[selectedElement.id];
      if ((action === "drawing" || action === "resizing") && adjustmentRequired(el.type)) {
        const adj = adjustElementCoordinates(el);
        update(el.id, adj.x1, adj.y1, adj.x2, adj.y2, el.type);
      }

      if (
        selectedElement.type === Tools.text &&
        clientX - (selectedElement.offsetX ?? 0) === selectedElement.x1 &&
        clientY - (selectedElement.offsetY ?? 0) === selectedElement.y1
      ) {
        setAction("writing");
        return;
      }
    }

    if (action === "panning") {
      document.body.style.cursor = "default";
    }

    setAction("none");
    setSelectedElement(null);
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (selectedElement?.type === Tools.text) {
      const se = selectedElement as TextElement;
      update(se.id, se.x1, se.y1, se.x2, se.y2, se.type, e.target.value);
      setAction("none");
      setSelectedElement(null);
    }
  };

  if (isMobile) {
    return (
      <div className="mobile-warning">
        <h2>CanvasCraft is not available on mobile devices</h2>
        <p>Please use a desktop or laptop for the best experience.</p>
      </div>
    );
  }

  return (
    <div className="excalidraw-container">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onOpenFile={handleOpenFile}
        onSaveFile={handleSaveFile}
        onExportImage={handleExportImage}
        onResetCanvas={handleResetCanvas}
        onToggleTheme={handleThemeChange}
        theme={darkMode ? "dark" : "light"}
        setCanvasBg={setCanvasBg}
        showHelpPage={() => setShowHelp(true)}
      />

      {showHelp ? (
        <HelpPage onBack={() => setShowHelp(false)} />
      ) : (
        <main className="canvas-wrapper" style={{ marginLeft: sidebarOpen ? 220 : 0 }}>
          <canvas
            id="canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
          {action === "writing" && selectedElement?.type === Tools.text && (
            <textarea
              ref={textRef}
              className="drawing-textarea"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              onBlur={handleBlur}
              style={{
                top: selectedElement.y1,
                left: selectedElement.x1,
                position: "absolute",
              }}
            />
          )}
        </main>
      )}

      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {sidebarOpen ? "✖" : "☰"}
      </button>

      <div className="toolbar-floating">
        <ActionBar tool={tool} setTool={setTool} />
        <button className="theme-toggle" onClick={() => setDarkMode((d) => !d)}>
          {darkMode ? "🌙" : "🌞"}
        </button>
      </div>

      <div className="info-floating-button">
        <Info />
      </div>

      <div className="bottom-left-controls">
        <ControlPanel undo={undo} redo={redo} onZoom={zoom} scale={scale} setScale={setScale} />
      </div>
    </div>
  );
}
