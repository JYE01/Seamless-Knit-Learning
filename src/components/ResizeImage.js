import React, { useRef } from 'react';

const ResizeImage = ({ src, alt }) => {
  const imageRef = useRef(null);
  const aspectRatio = useRef(1);
  const isResizing = useRef(false);

  const startResize = (e) => {
    isResizing.current = true;
    aspectRatio.current = imageRef.current.offsetWidth / imageRef.current.offsetHeight;

    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
  };

  const resize = (e) => {
    if (!isResizing.current) return;
    const newWidth = e.clientX - imageRef.current.getBoundingClientRect().left;
    const newHeight = newWidth / aspectRatio.current;

    imageRef.current.style.width = `${newWidth}px`;
    imageRef.current.style.height = `${newHeight}px`;
  };

  const stopResize = () => {
    isResizing.current = false;
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
  };

  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        style={{ maxWidth: '100%', height: 'auto', cursor: 'nwse-resize' }}
      />
      <div
        onMouseDown={startResize}
        style={{
          width: '10px',
          height: '10px',
          background: 'red',
          position: 'absolute',
          right: 0,
          bottom: 0,
          cursor: 'nwse-resize',
        }}
      />
    </div>
  );
};

export default ResizeImage;
