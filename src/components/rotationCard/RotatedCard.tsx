import React from "react";
import "./rotationCard.css";

interface RotatedCardProps {
  imageUrl: string;
  title: string;
  description: string;
  rotateY?: number;
  shadowColor?: string;
}

const RotatedCard = ({
  imageUrl,
  title,
  description,
  rotateY = -10,
  shadowColor = "rgba(0, 119, 204, 0.15)",
}: RotatedCardProps) => {
  return (
    <div className="rotated-card-container">
      <div
        className="rotated-card"
        style={
          {
            "--rotate-y": `${rotateY}deg`,
            "--shadow-color": shadowColor,
          } as React.CSSProperties
        }
      >
        <div className="card-front">
          <div className="card-image-container">
            <img src={imageUrl} alt={title} className="card-image" />
            <div className="card-overlay"></div>
          </div>

          <div className="card-content">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotatedCard;
