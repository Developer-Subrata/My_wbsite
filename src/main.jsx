import { StrictMode, Component, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Uncomment if you use a global stylesheet (design tokens, resets, etc.)
// import './index.css';

/* ============================================================
   1. THEME RESTORE (before first paint)
   ------------------------------------------------------------
   Applies the correct theme class to <body> BEFORE React
   mounts, so there's no flash of the wrong theme on reload.
   Falls back to the OS preference when nothing is stored.
   ============================================================ */
function restoreTheme() {
  try {
    const stored = localStorage.getItem('portfolio-theme');
    const prefersLight = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches;

    const shouldBeLight =
      stored === 'light' || (stored === null && prefersLight);

    document.body.classList.toggle('light-mode', shouldBeLight);
    document.documentElement.style.colorScheme = shouldBeLight
      ? 'light'
      : 'dark';
  } catch {
    /* localStorage can throw in private mode — ignore */
  }
}

/* ============================================================
   2. FONT PRELOADING (before first paint)
   ------------------------------------------------------------
   Starts fetching your Inter + JetBrains Mono fonts before
   React mounts — eliminates the flash of unstyled text (FOUT).
   ============================================================ */
function injectFonts() {
  if (document.querySelector('link[data-fonts]')) return;

  ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach(
    (href) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  );

  [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap',
  ].forEach((href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.fonts = 'true';
    document.head.appendChild(link);
  });
}

/* ============================================================
   3. ERROR BOUNDARY
   ------------------------------------------------------------
   Catches render crashes anywhere in the tree and shows a
   branded fallback instead of a blank white screen.
   ============================================================ */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env?.DEV) {
      console.error('[ErrorBoundary]', error, info);
    }
  }

  handleReload = () => window.location.reload();

  render() {
    if (this.state.hasError) {
      return (
        <div className="boot-error">
          <div className="boot-error-card">
            <div className="boot-error-icon">⚠️</div>
            <h1 className="boot-error-title">Something went wrong</h1>
            <p className="boot-error-msg">
              {import.meta.env?.DEV && this.state.error
                ? this.state.error.message
                : 'An unexpected error occurred while loading the page.'}
            </p>
            <button
              className="boot-error-btn"
              onClick={this.handleReload}
              type="button"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ============================================================
   4. SUSPENSE FALLBACK
   ------------------------------------------------------------
   Shown while lazy-loaded components are being fetched.
   Ready for future code-splitting.
   ============================================================ */
function LoadingFallback() {
  return (
    <div className="boot-loading" aria-live="polite" aria-busy="true">
      <div className="boot-loading-spinner" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

/* ============================================================
   5. BOOT
   ============================================================ */
const rootElement = document.getElementById('root');

if (!rootElement) {
  // Friendly visible fallback instead of a silent crash
  const msg = document.createElement('div');
  msg.textContent =
    '❌ Root element #root not found. Make sure index.html has <div id="root"></div>.';
  msg.style.cssText =
    'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;' +
    'padding:24px;font-family:system-ui,sans-serif;font-size:16px;text-align:center;' +
    'color:#f1f5f9;background:#0f172a;z-index:9999;';
  document.body.appendChild(msg);

  throw new Error(
    'Root element not found. Make sure <div id="root"></div> exists in index.html.'
  );
}

// Apply theme + fonts BEFORE React mounts (no FOUC / FOUT)
restoreTheme();
injectFonts();

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);

/* ============================================================
   6. SCOPED STYLES for the boot-time UI
   ============================================================ */
const bootStyles = document.createElement('style');
bootStyles.textContent = `
  /* ---------- Error fallback ---------- */
  .boot-error {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 24px;
    background: radial-gradient(ellipse 120% 80% at 50% 0%, #1e1b4b 0%, #0f172a 45%, #020617 100%);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  body.light-mode .boot-error {
    background: radial-gradient(ellipse 120% 80% at 50% 0%, #eef2ff 0%, #f8fafc 45%, #ffffff 100%);
  }
  .boot-error-card {
    max-width: 480px;
    width: 100%;
    text-align: center;
    background: linear-gradient(145deg, rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0.92));
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 24px;
    padding: 40px 32px;
    box-shadow:
      0 24px 60px -20px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(255, 255, 255, 0.03) inset;
  }
  body.light-mode .boot-error-card {
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(148, 163, 184, 0.25);
    box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.15);
  }
  .boot-error-icon { font-size: 2.4rem; margin-bottom: 16px; }
  .boot-error-title {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0 0 12px 0;
    color: #f1f5f9;
    letter-spacing: -0.02em;
  }
  body.light-mode .boot-error-title { color: #0f172a; }
  .boot-error-msg {
    font-size: 0.92rem;
    line-height: 1.7;
    color: #94a3b8;
    margin: 0 0 28px 0;
    word-break: break-word;
  }
  body.light-mode .boot-error-msg { color: #64748b; }
  .boot-error-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 28px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 700;
    color: #ffffff;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border: none;
    cursor: pointer;
    box-shadow: 0 8px 22px -8px rgba(139, 92, 246, 0.7);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.3s ease;
    font-family: inherit;
  }
  .boot-error-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px -8px rgba(139, 92, 246, 0.9);
  }
  .boot-error-btn:focus-visible {
    outline: 2px solid #a78bfa;
    outline-offset: 3px;
  }

  /* ---------- Loading spinner ---------- */
  .boot-loading {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #020617;
  }
  body.light-mode .boot-loading { background: #ffffff; }
  .boot-loading-spinner {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 3px solid rgba(148, 163, 184, 0.2);
    border-top-color: #8b5cf6;
    animation: bootSpin 0.8s linear infinite;
  }
  @keyframes bootSpin {
    to { transform: rotate(360deg); }
  }

  /* ---------- SR-only ---------- */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* ---------- Reduced motion ---------- */
  @media (prefers-reduced-motion: reduce) {
    .boot-loading-spinner { animation-duration: 3s; }
    .boot-error-btn { transition: none; }
  }
`;
document.head.appendChild(bootStyles);