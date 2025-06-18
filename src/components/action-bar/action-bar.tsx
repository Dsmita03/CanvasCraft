import {  ToolsType } from "../../types";
import { MdOutlineCropFree, MdOutlineHighlight } from "react-icons/md";
import {
  FiMousePointer, FiSquare, FiMinus, FiImage,
} from "react-icons/fi";
import { BsCircle } from "react-icons/bs"; 
import { IoHandRightOutline, IoText } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { PiEraserBold } from "react-icons/pi";
import { BsDiamond } from "react-icons/bs";
import { RiArrowRightLine } from "react-icons/ri";
import { RxLayers } from "react-icons/rx";
import { MdExpandMore } from "react-icons/md";
import { JSX, useState } from "react";

import "./action-bar-style.css";

type ActionBarProps = {
  tool: ToolsType;
  setTool: (tool: ToolsType) => void;
};

// Icon mapping
const ToolIcons: Record<ToolsType | "more", JSX.Element> = {
  selection: <FiMousePointer />,
  rectangle: <FiSquare />,
  diamond: <BsDiamond />,
  circle: <BsCircle />,
  arrow: <RiArrowRightLine />,
  line: <FiMinus />,  
  pencil: <LuPencil />,
  text: <IoText />,
  eraser: <PiEraserBold />,
  pan: <IoHandRightOutline />,
  image: <FiImage />,
  layers: <RxLayers />,
   laser: <MdOutlineHighlight />,        
  frame: <MdOutlineCropFree />,        
  lock: <MdExpandMore />,  
  more: <MdExpandMore />,
};

// Tools to show directly in horizontal bar
const MAIN_TOOLS: ToolsType[] = [
  "selection",
  "rectangle",
  "diamond",
  "circle",
  "arrow",
  "pencil",
  "text",
  "eraser",
  "pan",
];

// Tools to show in dropdown
const DROPDOWN_TOOLS: ToolsType[] = [
  "image",
  "layers",
  "frame",
  "laser",
];

export function ActionBar({ tool, setTool }: ActionBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const renderToolButton = (t: ToolsType, i?: number) => {
    const isSelected = tool === t;

    return (
      <div
        key={t}
        className={`inputWrapper ${isSelected ? "selected" : ""}`}
        onClick={() => {
          setTool(t);
          setDropdownOpen(false);
        }}
        tabIndex={0}
        role="radio"
        aria-checked={isSelected}
        title={t.charAt(0).toUpperCase() + t.slice(1)}
      >
        {ToolIcons[t]}
        {typeof i === "number" && <span className="toolKey">{i + 1}</span>}
      </div>
    );
  };

  return (
    <div className="actionBar horizontal" role="radiogroup" aria-label="Drawing Tools">
      {MAIN_TOOLS.map((t, i) => renderToolButton(t, i))}

      <div
        className="inputWrapper dropdownToggle"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        title="More tools"
      >
        {ToolIcons["more"]}
      </div>

      {dropdownOpen && (
        <div className="dropdownMenu below">
          {DROPDOWN_TOOLS.map((t) => (
            <div
              key={t}
              className="dropdownItem"
              onClick={() => setTool(t)}
              title={t}
            >
              {ToolIcons[t]}
              <span className="dropdownLabel">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
