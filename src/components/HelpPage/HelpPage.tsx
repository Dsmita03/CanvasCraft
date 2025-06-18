import "./HelpPage.css";

interface HelpPageProps {
  onBack: () => void;
}

export default function HelpPage({ onBack }: HelpPageProps) {
  return (
    <div className="help-page-overlay">
      <div className="help-page">
        <div className="help-header">
          <button className="back-button" onClick={onBack}>← Back</button>
          <h1>Help & Info</h1>
          <p className="subtitle">Get the most out of your experience</p>
        </div>

        <div className="help-content">
          <section>
            <h2>🧭 Getting Started</h2>
            <p>Learn how to open, save, and export your files. Start your first drawing in seconds.</p>
          </section>

          <section>
            <h2>⌨️ Keyboard Shortcuts</h2>
            <ul>
              <li><strong>Ctrl + Z</strong> – Undo</li>
              <li><strong>Ctrl + Y</strong> – Redo</li>
              <li><strong>Ctrl + S</strong> – Save</li>
              <li><strong>Ctrl + K</strong> – Command Palette</li>
            </ul>
          </section>

          <section>
            <h2>❓ FAQs</h2>
            <p>Have questions? We’ve got answers. This section will soon include common help topics.</p>
          </section>

          <section>
            <h2>📬 Need More Help?</h2>
            <p>
              Join our <a href="https://discord.com/invite/your-server" target="_blank" rel="noreferrer">Discord</a> or open an issue on <a href="https://github.com/your-repo" target="_blank" rel="noreferrer">GitHub</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
