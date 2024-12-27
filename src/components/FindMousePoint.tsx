import { useState, useEffect } from "react";

export function FindMousePoint() {
  const [startPoint, setStartPoint] = useState(null);
  const [currentMousePoint, setCurrentMousePoint] = useState(null);
  const [currentAngle, setCurrentAngle] = useState(null);

  const handleMouseClick = (e: { clientX: any; clientY: any }) => {
    const { clientX, clientY } = e;

    if (!startPoint) {
      // İlk tıklamada başlangıç noktasını ayarla
      setStartPoint({ x: clientX, y: clientY });
    } else {
      // İkinci tıklamada başlangıç noktasını sıfırla
      setStartPoint(null);
      setCurrentMousePoint(null);
      setCurrentAngle(null);
    }
  };

  const handleMouseMove = (e: { clientX: any; clientY: any }) => {
    if (startPoint) {
      const { clientX, clientY } = e;
      setCurrentMousePoint({ x: clientX, y: clientY });

      // Açı hesapla
      const dx = clientX - startPoint.x;
      const dy = clientY - startPoint.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Radyanları dereceye çevir
      setCurrentAngle(angle.toFixed(2)); // Açı bilgisini güncelle
    }
  };

  return (
    <div
      onClick={handleMouseClick}
      onMouseMove={handleMouseMove}
      className={`${startPoint ? 'absolute top-0 right-0 left-0 bottom-0' : 'hidden'}`}
      style={{ cursor: "crosshair" }}
    >
      {startPoint && (
        <>
          {/* Başlangıç noktası */}
          <div
            style={{
              position: "absolute",
              top: startPoint.y - 5,
              left: (startPoint.x - 5),
              width: 10,
              height: 10,
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          />
          {currentMousePoint && (
            <>
              {/* Ok işareti */}
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                }}
                width="100%"
                height="100%"
              >
                <line
                  x1={startPoint.x}
                  y1={startPoint.y}
                  x2={currentMousePoint.x}
                  y2={currentMousePoint.y}
                  stroke="blue"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="10"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="blue" />
                  </marker>
                </defs>
              </svg>

              {/* Daire ve açı numaraları */}
              <div
                style={{
                  position: "absolute",
                  top: startPoint.y - 100,
                  left: startPoint.x - 100,
                  width: 200,
                  height: 200,
                  border: "1px solid black",
                  borderRadius: "50%",
                }}
              >
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30) * (Math.PI / 180); // Dereceyi radyana çevir
                  const x = 100 + 90 * Math.cos(angle); // Dairenin yarıçapı 90
                  const y = 100 + 90 * Math.sin(angle);
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        top: y - 10,
                        left: x - 10,
                        width: 20,
                        height: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "10px",
                      }}
                    >
                      {i * 30}°
                    </div>
                  );
                })}
              </div>

              {/* Açı bilgisi */}
              <div
                style={{
                  position: "absolute",
                  top: currentMousePoint.y + 10, // Okun ucunun biraz altı
                  left: currentMousePoint.x + 10, // Okun ucunun biraz sağı
                  backgroundColor: "white",
                  padding: "2px 5px",
                  border: "1px solid black",
                  borderRadius: "3px",
                  fontSize: "12px",
                }}
              >
                {currentAngle}°
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}