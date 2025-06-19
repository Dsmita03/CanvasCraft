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
  onZoom: (scaleDelta: number) => void;
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

        {/* Zoom Controls */}
        <div className="zoomPanel">
          <button
            type="button"
            aria-label="Zoom Out"
            data-tooltip-id="canvas-tooltip"
            data-tooltip-content="Zoom Out"
            onClick={() => onZoom(-0.1)}
            className="controlBtn"
          >
            <PiMinus />
          </button>

          <button
            type="button"
            aria-label="Reset Zoom"
            data-tooltip-id="canvas-tooltip"
            data-tooltip-content="Reset Zoom to 100%"
            onClick={() => setScale(1)}
            className="controlBtn"
          >
            {scalePercent}
          </button>

          <button
            type="button"
            aria-label="Zoom In"
            data-tooltip-id="canvas-tooltip"
            data-tooltip-content="Zoom In"
            onClick={() => onZoom(0.1)}
            className="controlBtn"
          >
            <PiPlus />
          </button>
        </div>

        {/* Undo/Redo Controls */}
        <div className="editPanel">
          <button
            type="button"
            aria-label="Undo"
            data-tooltip-id="canvas-tooltip"
            data-tooltip-content="Undo"
            onClick={undo}
            className="controlBtn"
          >
            <HiOutlineArrowUturnLeft />
          </button>

          <button
            type="button"
            aria-label="Redo"
            data-tooltip-id="canvas-tooltip"
            data-tooltip-content="Redo"
            onClick={redo}
            className="controlBtn"
          >
            <HiOutlineArrowUturnRight />
          </button>
        </div>
      </div>

      {/* Shared tooltip for all buttons */}
      <Tooltip id="canvas-tooltip" place="top" offset={10} delayShow={200} />
    </div>
  );
}
