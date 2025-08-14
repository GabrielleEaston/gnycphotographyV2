export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="mx-auto w-full px-[clamp(16px,3vw,40px)]">  
        <div className="footer-bar border-t border-black">
          <div className="footer-brand">GNYCPHOTOGRAPHY</div>

          <nav aria-label="Footer" className="footer-nav">
            <a
              href="mailto:youremail@example.com"
              className="footer-link"
            >
              Email
            </a>
            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Instagram
            </a>
          </nav>
        </div>

        {/* legal line */}
        <div className="footer-legal">
          © {new Date().getFullYear()} GNYCPhotography. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
