import { useState, useEffect } from "react";
import PartnersGallery from "./PartnersGallery";
import MainHeading from "./MainHeading";

function PartnersSection() {
  const [disableMotion, setDisableMotion] = useState(() =>
    typeof globalThis.matchMedia === "function"
      ? globalThis.matchMedia("(max-width: 480px)").matches
      : false,
  );
  const [params, setParams] = useState({
    fit: 1,
    minRadius: 1000,
    maxRadius: Infinity,
    padFactor: 0.25,
    dragSensitivity: 20,
    maxVerticalRotationDeg: 0,
    segments: 34,
    dragDampening: 5,
    grayscale: false,
  });

  useEffect(() => {
    const updateParams = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        setDisableMotion(true);
        setParams({
          fit: 0.5,
          minRadius: 180,
          maxRadius: 350,
          segments: 16,
          padFactor: 0.08,
          dragSensitivity: 40,
          maxVerticalRotationDeg: 0.2,
          dragDampening: 3,
          grayscale: false,
        });
      } else if (width <= 768) {
        setDisableMotion(false);
        setParams({
          fit: 0.7,
          minRadius: 380,
          maxRadius: 600,
          segments: 18,
          padFactor: 0.12,
          dragSensitivity: 30,
          maxVerticalRotationDeg: 2.5,
          dragDampening: 4,
          grayscale: false,
        });
      } else if (width <= 1024) {
        setDisableMotion(false);
        setParams({
          fit: 0.62,
          minRadius: 420,
          maxRadius: 680,
          segments: 22,
          padFactor: 0.14,
          dragSensitivity: 26,
          maxVerticalRotationDeg: 2.5,
          dragDampening: 4,
          grayscale: false,
        });
      } else {
        setDisableMotion(false);
        setParams({
          fit: 1,
          minRadius: 1000,
          maxRadius: Infinity,
          segments: 34,
          padFactor: 0.25,
          dragSensitivity: 20,
          maxVerticalRotationDeg: 5,
          dragDampening: 5,
          grayscale: false,
        });
      }
    };

    updateParams();
    window.addEventListener("resize", updateParams);
    return () => window.removeEventListener("resize", updateParams);
  }, []);

  return (
    <section className="about-section-spacing">
      <MainHeading
        heading="Powered by Trusted Partners"
        description="We collaborate with industry leaders to deliver exceptional results."
      />
      <PartnersGallery
        fit={params.fit}
        minRadius={params.minRadius}
        maxRadius={params.maxRadius}
        segments={params.segments}
        padFactor={params.padFactor}
        dragSensitivity={params.dragSensitivity}
        maxVerticalRotationDeg={params.maxVerticalRotationDeg}
        dragDampening={params.dragDampening}
        grayscale={params.grayscale}
        disableMotion={disableMotion}
      />
    </section>
  );
}

export default PartnersSection;
