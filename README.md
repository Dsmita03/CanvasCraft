# 🎨 CanvasCraft
CanvasCraft is an Excalidraw-inspired drawing tool built with React, TypeScript, and Rough.js, offering a sketchy, hand-drawn look and feel. This project was created as a learning playground with a strong focus on functionality, interactivity, and clean code architecture.

## 🚀 Tech Stack
- Vite – Fast and modern build tool.

- React.js – For building the user interface.

- TypeScript – Ensures type safety and better developer experience.

- Rough.js – Renders hand-drawn, sketch-style shapes.

- Vitest – Unit testing framework.

- Cypress – End-to-end testing.

- Testing Library – For component testing.

- CSS – Simple and lightweight styling.

## ✨ Features
### 🛠️ Drawing Tools
1. Freehand (Pencil)

2. Line

3. Rectangle

4. Text

### 🧠 Smart Interactions
1. Select & Move elements

2. Resize shapes (lines and rectangles)

3. Edit Text inline

4. Eraser Tool to remove individual elements

### 🗺️ Navigation
- Zoom In/Out using Ctrl + Scroll or on-screen controls

- Pan with Space + Drag or the middle mouse button

### 💾 Canvas Controls
- Save your work as .json

- Load existing canvas (pending)

- Export to .png

- Reset canvas with one click

- Toggle between dark and light themes

- Custom canvas background color

### ⌨️ Keyboard Shortcuts
- Shortcut	Action
1. Ctrl + Z	Undo
2. Ctrl + Shift + Z or Ctrl + Y	Redo
3. Space + Drag	Pan
4. Ctrl + +	Zoom In
5. Ctrl + -	Zoom Out

### 🧪 Testing
CanvasCraft includes automated tests using:

- Vitest for unit tests

- Cypress for end-to-end interactions

- Testing Library for React component behavior

Test cases cover:

- Drawing

- Text manipulation

- Shape movement & resizing

- Zoom and pan functionality

### 🧠 Learning Outcomes
This project was built to reinforce key frontend and canvas manipulation concepts:

🔍 Discoveries & Concepts
- Rough.js: Enabled me to build sketch-style shapes that look human-drawn.

- Canvas Drawing: Learned to manage coordinates, mouse interactions, and element state.

- Path Management: Explored getSvgPathFromStroke for freehand smoothing.

- React Internals: Used useLayoutEffect to avoid flickering and sync DOM updates.

- Event Listeners: Managed custom interactions like wheel scrolling for zoom/pan.

- State Management: Created a custom undo/redo stack with persistent state updates.

