export default function Footer() {
  return (
    <footer className="bg-white text-gray py-12">
    <div className="container mx-auto text-center flex flex-col gap-3 items-center">
      <div className="text-lg font-light">
        Contact:{" "}
        <a href="mailto:youremail@example.com" className="underline">
          youremail@example.com
        </a>
      </div>
      <div>
        <a
          href="https://instagram.com/yourhandle"
          target="_blank"
          rel="noopener"
          className="underline text-lg font-light"
        >
          DM me on Instagram
        </a>
      </div>
      <div className="text-xs text-gray-400 mt-3">
        GNYCPhotography. All rights reserved.
      </div>
    </div>
  </footer>  
  );
}
