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
      {/* Move toggle button outside sidebar so it doesn't overlap */}
      {!isOpen && (
        <button
          className="sidebar-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`} role="complementary">
        {/* Close button inside sidebar */}
        <button
          className="sidebar-close-btn"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          {/* ✖ */}
        </button>

        <nav className="sidebar-content">
          <div className="menu-group">
            <h4>🗂 File</h4>
            <button onClick={onOpenFile}>📂 Open</button>
            <button onClick={onSaveFile}>💾 Save</button>
            <button onClick={onExportImage}>🖼 Export Image</button>
            <button onClick={() => alert("Live Collaboration coming soon!")}>
              🤝 Live Collaboration
            </button>
          </div>

          <div className="menu-group">
            <h4>⚙️ Tools</h4>
            <button onClick={() => alert("Command Palette: Ctrl+K")}>
              ⚡ Command Palette
            </button>
            <button onClick={() => alert("Search feature coming soon!")}>
              🔍 Find on Canvas
            </button>
            <button onClick={showHelpPage}>❓ Help</button>
            <button onClick={onResetCanvas}>🔄 Reset Canvas</button>
          </div>

          <div className="menu-group">
            <h4>🎨 Appearance</h4>
            <label>
              Theme:
              <select value={theme} onChange={(e) => onToggleTheme(e.target.value)}>
                <option value="light">🌞 Light</option>
                <option value="dark">🌙 Dark</option>
              </select>
            </label>
            <label>
              Canvas Background:
              <input type="color" onChange={(e) => setCanvasBg(e.target.value)} />
            </label>
          </div>
        </nav>
      </aside>
    </>
  );
}
