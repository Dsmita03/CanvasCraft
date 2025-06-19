import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";
import "./info-style.css";

export function Info() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        className="infoButton"
        aria-label="Open information dialog"
        onClick={handleOpen}
      >
        <InfoOutlinedIcon fontSize="inherit" />
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="info-dialog-title"
        PaperProps={{ className: "infoDialogPaper" }}
      >
        <DialogTitle id="info-dialog-title" className="infoDialogTitle">
          🎨 Welcome to <span>CanvasCraft</span>
        </DialogTitle>

        <IconButton
          onClick={handleClose}
          aria-label="Close information dialog"
          className="infoDialogClose"
        >
          <CloseIcon />
        </IconButton>

        <div className="infoDialogContent" role="document">
          <p className="infoIntro">
            Start drawing freely with just a few steps:
          </p>

          <section className="infoSection">
            <h4>🛠 Tools</h4>
            <ul>
              <li><strong>Pencil, Line, Rectangle, Text:</strong> Click to select and draw.</li>
              <li><strong>Eraser:</strong> Remove unwanted elements easily.</li>
              <li><strong>Selection:</strong> Move or edit your shapes.</li>
            </ul>
          </section>

          <section className="infoSection">
            <h4>🖱 Interactions</h4>
            <ul>
              <li><strong>Draw:</strong> Click and drag on canvas.</li>
              <li><strong>Move:</strong> Select and drag elements.</li>
              <li><strong>Text:</strong> Click with text tool and type.</li>
              <li><strong>Pan:</strong> Hold <code>Space</code> or middle-click and drag.</li>
              <li><strong>Zoom:</strong> Ctrl + Scroll or use Zoom Buttons.</li>
            </ul>
          </section>

          <section className="infoSection">
            <h4>⌨️ Keyboard Shortcuts</h4>
            <ul>
              <li><strong>Undo:</strong> Ctrl + Z</li>
              <li><strong>Redo:</strong> Ctrl + Y / Ctrl + Shift + Z</li>
              <li><strong>Zoom In:</strong> Ctrl + +</li>
              <li><strong>Zoom Out:</strong> Ctrl + -</li>
            </ul>
          </section>

          <p className="infoOutro">
            ✨ Let your creativity flow with CanvasCraft!
          </p>
        </div>
      </Dialog>
    </div>
  );
}
