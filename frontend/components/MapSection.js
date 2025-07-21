import React from 'react';

const MapSection = ({ lat, lng, name }) => {
  if (!lat || !lng) {
    return (
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
        <span className="text-gray-500">Location not available</span>
      </div>
    );
  }
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
  return (
    <div className="w-full aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border">
      <iframe
        title={`Map of ${name}`}
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapSection;
