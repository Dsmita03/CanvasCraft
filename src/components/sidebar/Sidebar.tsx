
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onOpenFile: () => void;
  onSaveFile: () => void;
  onExportImage: () => void;
  onResetCanvas: () => void;
  onToggleTheme: (theme: string) => void;
  theme: string;
  setCanvasBg: (color: string) => void;
  showHelpPage: () => void;
}

export default function Sidebar({
  isOpen,
  toggleSidebar,
  onOpenFile,
  onSaveFile,
  onExportImage,
  onResetCanvas,
  onToggleTheme,
  theme,
  setCanvasBg,
  showHelpPage,
}: SidebarProps) {
  return (
    <>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "✖" : "☰"}
      </button>

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <section className="menu-group">
          <button onClick={onOpenFile}>📂 Open</button>
          <button onClick={onSaveFile}>💾 Save to...</button>
          <button onClick={onExportImage}>🖼 Export Image</button>
          <button onClick={() => alert("Live Collaboration coming soon!")}>
            🤝 Live Collaboration
          </button>
        </section>

        <section className="menu-group">
          <button onClick={() => alert("Command Palette shortcut: Ctrl+K")}>
            ⚡ Command Palette
          </button>
          <button onClick={() => alert("Search feature coming soon!")}>
            🔍 Find on Canvas
          </button>
          <button onClick={showHelpPage}>❓ Help</button>

          <button onClick={onResetCanvas}>🔄 Reset Canvas</button>
        </section>

        <section className="menu-group">
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://discord.com/" target="_blank" rel="noreferrer">
            Discord
          </a>
        </section>

        <section className="menu-group">
          <label>
            Theme:
            <select value={theme} onChange={(e) => onToggleTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <label>
            Background:
            <input
              type="color"
              onChange={(e) => setCanvasBg(e.target.value)}
            />
          </label>
        </section>
      </aside>
    </>
  );
}
