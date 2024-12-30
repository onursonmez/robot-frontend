import React, { useState } from "react";

// Recursive component to render JSON data
const JsonViewer = ({ data, level = 0, isRoot = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(!isRoot); // Kök seviyesinde açık başlat

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  if (typeof data === "object" && data !== null) {
    const isArray = Array.isArray(data);
    const entries = isArray ? data : Object.entries(data);

    return (
      <div style={{ marginLeft: level === 0 ? 0 : 20 }}>
        {/* Kök seviyesinde düğme göstermiyoruz */}
        {!isRoot && (
          <button type="button" onClick={toggleCollapse}>
            {isCollapsed ? "+" : "-"} {isArray ? "Array" : "Object"}
          </button>
        )}
        {!isCollapsed && (
          <div>
            {isArray
              ? entries.map((item, index) => (
                  <div key={index}>
                    <JsonViewer data={item} level={level + 1} />
                  </div>
                ))
              : entries.map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong>{" "}
                    <JsonViewer data={value} level={level + 1} />
                  </div>
                ))}
          </div>
        )}
      </div>
    );
  }

  // Render primitive values
  return <span>{String(data)}</span>;
};

// Main component
const RobotDetails = ({ robot }) => {
  return (
    <div>
      <JsonViewer data={robot} isRoot={true} /> {/* Kök seviyesini işaretle */}
    </div>
  );
};

export default RobotDetails;