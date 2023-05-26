import React, { useRef, useCallback } from "react";
import Tooltip from "./assets/Tooltip";

const ShareModal = ({ title, link }) => {
  const linkRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    if(link) {
      navigator.clipboard.writeText(link);
      alert("Url Koperad");
    } else if (linkRef.current) {
      navigator.clipboard.writeText(linkRef.current.innerText);
      alert("Url Koperad");
    }
  }, []);

  const handleLinkClick = useCallback((event) => {
    event.preventDefault();
    window.open(
      event.currentTarget.href,
      "share-dialog",
      "width=626,height=436"
    );
  }, []);

  return (
    <div className="shareMagForum">
      <div className="share-header">
        <h2>{title}</h2>
      </div>
      <hr />
      <div className="social-media-share">
        <Tooltip label={"Dela på Facebook"}>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener"
            onClick={handleLinkClick}
          >
            <img
              className="YOUR_FB_CSS_STYLING_CLASS"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
              width="34px"
              height="34px"
              alt="Share on Facebook"
            />
          </a>
        </Tooltip>
        <Tooltip label={"Dela på Twitter"}>
          <a
            href={`http://twitter.com/share?url=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener"
            onClick={handleLinkClick}
          >
            <img
              className="YOUR_FB_CSS_STYLING_CLASS"
              src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-twitter-social-media-round-icon-png-image_6315985.png"
              width="34px"
              height="34px"
              alt="Share on Twitter"
            />
          </a>
        </Tooltip>
      </div>

      <div className="url">
        <div className="link" ref={linkRef}>
          {link? link: window.location.href}
        </div>
        <button onClick={copyToClipboard}>kopiera</button>
      </div>
    </div>
  );
};

export default ShareModal;