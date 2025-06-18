import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import './control-panel-style.css';

import { PiMinus, PiPlus } from 'react-icons/pi';
import {
  HiOutlineArrowUturnLeft,
  HiOutlineArrowUturnRight,
} from 'react-icons/hi2';

type ControlPanelProps = {
  undo: () => void;
  redo: () => void;
  onZoom: (scale: number) => void;
  scale: number;
  setScale: (scale: number) => void;
};

export function ControlPanel({
  undo,
  redo,
  onZoom,
  scale,
  setScale,
}: ControlPanelProps) {
  const scalePercent = new Intl.NumberFormat('en-GB', {
    style: 'percent',
  }).format(scale);

  return (
    <div className="controlPanelWrapper">
      <div className="controlPanel" role="toolbar" aria-label="Canvas Controls">
        <div className="zoomPanel">
          <button
            data-tooltip-id="canvas-tooltip"
            data-tooltip-content="Zoom Out"
            aria-label="Zoom Out"
            onClick={() => onZoom(-0.1)}
          >
            <PiMinus />
          </button>

          <button
            data-tooltip-id="canvas-tooltip"
            data-tooltip-content="Reset Zoom to 100%"
            aria-label="Reset Zoom"
            onClick={() => setScale(1)}
          >
            {scalePercent}
          </button>

          <button
            data-tooltip-id="canvas-tooltip"
            data-tooltip-content="Zoom In"
            aria-label="Zoom In"
            onClick={() => onZoom(0.1)}
          >
            <PiPlus />
          </button>
        </div>

        <div className="editPanel">
          <button
            data-tooltip-id="canvas-tooltip"
            data-tooltip-content="Undo"
            aria-label="Undo"
            onClick={undo}
          >
            <HiOutlineArrowUturnLeft />
          </button>

          <button
            data-tooltip-id="canvas-tooltip"
            data-tooltip-content="Redo"
            aria-label="Redo"
            onClick={redo}
          >
            <HiOutlineArrowUturnRight />
          </button>
        </div>
      </div>

      {/* Shared tooltip for all buttons */}
      <Tooltip id="canvas-tooltip" />
    </div>
  );
}
