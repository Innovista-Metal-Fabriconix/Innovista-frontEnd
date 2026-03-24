import type { CSSProperties, MouseEvent, PointerEvent } from "react";
import { useEffect, useMemo, useRef, useCallback, useState } from "react";
import { useGesture } from "@use-gesture/react";
import styles from "../cssModules/PartnersGallery.module.css";

type ImageSource = string | { src: string; alt?: string };
type NormalizedImage = { src: string; alt: string };

type FitBasis = "auto" | "min" | "max" | "width" | "height";

type ResponsiveConfig = {
  fit: number;
  minRadius: number;
  maxRadius: number;
  segments: number;
  padFactor: number;
  dragSensitivity: number;
  maxVerticalRotationDeg: number;
};

export type PartnersGalleryProps = {
  images?: ImageSource[];
  fit?: number;
  fitBasis?: FitBasis;
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
  disableMotion?: boolean;
};

const DEFAULT_IMAGES: NormalizedImage[] = [
  {
    src: "https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Abstract art",
  },
  {
    src: "https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Modern sculpture",
  },
  {
    src: "https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Digital artwork",
  },
  {
    src: "https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Contemporary art",
  },
  {
    src: "https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Geometric pattern",
  },
  {
    src: "https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Textured surface",
  },
  {
    src: "https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",
    alt: "Social media image",
  },
  {
    src: "https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",
    alt: "Social media image",
  },
  {
    src: "https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",
    alt: "Social media image",
  },
  {
    src: "https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",
    alt: "Social media image",
  },
  {
    src: "https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",
    alt: "Social media image",
  },
  {
    src: "https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",
    alt: "Social media image",
  },
  {
    src: "https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",
    alt: "Social media image",
  },
  {
    src: "https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",
    alt: "Social media image",
  },
  {
    src: "https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",
    alt: "Social media image",
  },
  {
    src: "https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",
    alt: "Social media image",
  },
];

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35,
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;

const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
  const attr = el.dataset[name];
  const n = attr == null ? Number.NaN : Number.parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

const normalizeImages = (images: ImageSource[]): NormalizedImage[] => {
  return images
    .map((image) => {
      if (typeof image === "string") return { src: image, alt: "" };
      return { src: image.src || "", alt: image.alt || "" };
    })
    .filter((img) => Boolean(img.src));
};

const useIsMobile = (breakpointPx: number) => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof globalThis.matchMedia === "function"
      ? globalThis.matchMedia(`(max-width: ${breakpointPx}px)`).matches
      : false,
  );

  useEffect(() => {
    if (typeof globalThis.matchMedia !== "function") return;
    const mq = globalThis.matchMedia(`(max-width: ${breakpointPx}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, [breakpointPx]);

  return isMobile;
};

const getClientXY = (
  evt: unknown,
): {
  x: number;
  y: number;
} | null => {
  if (!evt || typeof evt !== "object") return null;

  if ("touches" in evt) {
    const touchEvent = evt as TouchEvent;
    const t = touchEvent.touches?.[0] ?? touchEvent.changedTouches?.[0];
    if (!t) return null;
    return { x: t.clientX, y: t.clientY };
  }

  if ("clientX" in evt && "clientY" in evt) {
    const mouseLike = evt as MouseEvent;
    return {
      x: typeof mouseLike.clientX === "number" ? mouseLike.clientX : 0,
      y: typeof mouseLike.clientY === "number" ? mouseLike.clientY : 0,
    };
  }

  return null;
};

const runInAnimationFrames = (steps: Array<() => void>) => {
  let index = 0;

  const runNext = () => {
    const step = steps[index++];
    if (!step) return;
    requestAnimationFrame(() => {
      step();
      runNext();
    });
  };

  runNext();
};

type SphereItem = {
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
  src: string;
  alt: string;
};

function buildItems(pool: ImageSource[], seg: number): SphereItem[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map((c) => ({ ...c, src: "", alt: "" }));
  }
  if (pool.length > totalSlots) {
    console.warn(
      `[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.`,
    );
  }

  const normalizedImages = normalizeImages(pool);

  const usedImages = Array.from(
    { length: totalSlots },
    (_, i) => normalizedImages[i % normalizedImages.length],
  );

  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i];
          usedImages[i] = usedImages[j];
          usedImages[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt,
  }));
}

function computeItemBaseRotation(
  offsetX: number,
  offsetY: number,
  sizeX: number,
  sizeY: number,
  segments: number,
) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

function PartnersGalleryFlat({
  images,
  imageBorderRadius,
  grayscale,
}: Readonly<{
  images: ImageSource[];
  imageBorderRadius: string;
  grayscale: boolean;
}>) {
  const flatImages = normalizeImages(images);
  const flatStyle = {
    ["--tile-radius" as never]: imageBorderRadius,
    ["--image-filter" as never]: grayscale ? "grayscale(1)" : "none",
  } as unknown as CSSProperties;

  return (
    <div className={styles.flatRoot} style={flatStyle}>
      <div className={styles.flatGrid}>
        {flatImages.map((img, idx) => (
          <div className={styles.flatItem} key={`${img.src}-${idx}`}>
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PartnersGallerySphere({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = "auto",
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = "#060010",
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = "250px",
  openedImageHeight = "350px",
  imageBorderRadius = "30px",
  openedImageBorderRadius = "30px",
  grayscale = true,
  disableMotion = false,
}: Readonly<PartnersGalleryProps>) {
  const [responsiveConfig, setResponsiveConfig] = useState<ResponsiveConfig>(
    () => {
      if (typeof globalThis.innerWidth !== "number") {
        return {
          fit,
          minRadius,
          maxRadius,
          segments,
          padFactor,
          dragSensitivity,
          maxVerticalRotationDeg,
        };
      }

      const width = globalThis.innerWidth;
      if (width <= 480) {
        return {
          fit: 0.8,
          minRadius: 300,
          maxRadius: 500,
          segments: 12,
          padFactor: 0.08,
          dragSensitivity: 40,
          maxVerticalRotationDeg: 0.2,
        };
      }

      if (width <= 768) {
        return {
          fit: 0.7,
          minRadius: 380,
          maxRadius: 600,
          segments: 18,
          padFactor: 0.12,
          dragSensitivity: 30,
          maxVerticalRotationDeg: 2.5,
        };
      }

      if (width <= 1024) {
        return {
          fit: 0.62,
          minRadius: 420,
          maxRadius: 680,
          segments: 22,
          padFactor: 0.14,
          dragSensitivity: 26,
          maxVerticalRotationDeg: 2.5,
        };
      }

      return {
        fit,
        minRadius,
        maxRadius,
        segments,
        padFactor,
        dragSensitivity,
        maxVerticalRotationDeg,
      };
    },
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const sphereRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const focusedElRef = useRef<HTMLButtonElement | null>(null);
  const originalTilePositionRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const rotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startRotRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);

  const scrollLockedRef = useRef(false);
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add("dg-scroll-lock");
  }, []);
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.dataset.enlarging === "true") return;
    scrollLockedRef.current = false;
    document.body.classList.remove("dg-scroll-lock");
  }, []);

  const items = useMemo(
    () => buildItems(images, responsiveConfig.segments),
    [images, responsiveConfig.segments],
  );

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  const lockedRadiusRef = useRef<number | null>(null);

  useEffect(() => {
    const onResize = () => {
      const width = globalThis.innerWidth;
      if (width <= 480) {
        setResponsiveConfig((prev) => ({
          ...prev,
          fit: 0.8,
          minRadius: 300,
          maxRadius: 500,
          segments: 12,
          padFactor: 0.08,
          dragSensitivity: 40,
          maxVerticalRotationDeg: 0.2,
        }));
        return;
      }

      if (width <= 768) {
        setResponsiveConfig((prev) => ({
          ...prev,
          fit: 0.7,
          minRadius: 380,
          maxRadius: 600,
          segments: 18,
          padFactor: 0.12,
          dragSensitivity: 30,
          maxVerticalRotationDeg: 2.5,
        }));
        return;
      }

      if (width <= 1024) {
        setResponsiveConfig((prev) => ({
          ...prev,
          fit: 0.62,
          minRadius: 420,
          maxRadius: 680,
          segments: 22,
          padFactor: 0.14,
          dragSensitivity: 26,
          maxVerticalRotationDeg: 2.5,
        }));
        return;
      }

      setResponsiveConfig((prev) => ({
        ...prev,
        fit,
        minRadius,
        maxRadius,
        segments,
        padFactor,
        dragSensitivity,
        maxVerticalRotationDeg,
      }));
    };

    onResize();
    globalThis.addEventListener?.("resize", onResize);
    return () => globalThis.removeEventListener?.("resize", onResize);
  }, [
    dragSensitivity,
    fit,
    maxRadius,
    maxVerticalRotationDeg,
    minRadius,
    padFactor,
    segments,
  ]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height);
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h;
      let basis;
      switch (fitBasis) {
        case "min":
          basis = minDim;
          break;
        case "max":
          basis = maxDim;
          break;
        case "width":
          basis = w;
          break;
        case "height":
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * responsiveConfig.fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(
        radius,
        responsiveConfig.minRadius,
        responsiveConfig.maxRadius,
      );
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(
        8,
        Math.round(minDim * responsiveConfig.padFactor),
      );
      root.style.setProperty("--radius", `${lockedRadiusRef.current}px`);
      root.style.setProperty("--viewer-pad", `${viewerPad}px`);
      root.style.setProperty("--overlay-blur-color", overlayBlurColor);
      root.style.setProperty("--tile-radius", imageBorderRadius);
      root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
      root.style.setProperty(
        "--image-filter",
        grayscale ? "grayscale(1)" : "none",
      );
      applyTransform(rotationRef.current.x, rotationRef.current.y);

      const enlargedOverlay = viewerRef.current?.querySelector(
        `.${styles.enlarge}`,
      );
      if (
        enlargedOverlay instanceof HTMLElement &&
        frameRef.current &&
        mainRef.current
      ) {
        const frameR = frameRef.current.getBoundingClientRect();
        const mainR = mainRef.current.getBoundingClientRect();

        const hasCustomSize = openedImageWidth && openedImageHeight;
        if (hasCustomSize) {
          const tempDiv = document.createElement("div");
          tempDiv.style.cssText = `position: absolute; width: ${openedImageWidth}; height: ${openedImageHeight}; visibility: hidden;`;
          document.body.appendChild(tempDiv);
          const tempRect = tempDiv.getBoundingClientRect();
          tempDiv.remove();

          const centeredLeft =
            frameR.left - mainR.left + (frameR.width - tempRect.width) / 2;
          const centeredTop =
            frameR.top - mainR.top + (frameR.height - tempRect.height) / 2;

          enlargedOverlay.style.left = `${centeredLeft}px`;
          enlargedOverlay.style.top = `${centeredTop}px`;
        } else {
          enlargedOverlay.style.left = `${frameR.left - mainR.left}px`;
          enlargedOverlay.style.top = `${frameR.top - mainR.top}px`;
          enlargedOverlay.style.width = `${frameR.width}px`;
          enlargedOverlay.style.height = `${frameR.height}px`;
        }
      }
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fitBasis,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius,
    openedImageWidth,
    openedImageHeight,
    responsiveConfig.fit,
    responsiveConfig.maxRadius,
    responsiveConfig.minRadius,
    responsiveConfig.padFactor,
  ]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  useEffect(() => {
    if (!disableMotion) return;
    stopInertia();
    draggingRef.current = false;
    movedRef.current = false;
    rotationRef.current = { x: 0, y: 0 };
    applyTransform(0, 0);
  }, [disableMotion, stopInertia]);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      if (disableMotion) return;
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(
          rotationRef.current.x - vY / 200,
          -responsiveConfig.maxVerticalRotationDeg,
          responsiveConfig.maxVerticalRotationDeg,
        );
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [
      disableMotion,
      dragDampening,
      responsiveConfig.maxVerticalRotationDeg,
      stopInertia,
    ],
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (disableMotion) return;
        if (focusedElRef.current) return;
        stopInertia();
        const pt = getClientXY(event);
        if (!pt) return;
        draggingRef.current = true;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: pt.x, y: pt.y };
      },
      onDrag: ({
        event,
        last,
        velocity = [0, 0],
        direction = [0, 0],
        movement,
      }) => {
        if (disableMotion) return;
        if (
          focusedElRef.current ||
          !draggingRef.current ||
          !startPosRef.current
        )
          return;
        const pt = getClientXY(event);
        if (!pt) return;
        const dxTotal = pt.x - startPosRef.current.x;
        const dyTotal = pt.y - startPosRef.current.y;
        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }
        const nextX = clamp(
          startRotRef.current.x - dyTotal / responsiveConfig.dragSensitivity,
          -responsiveConfig.maxVerticalRotationDeg,
          responsiveConfig.maxVerticalRotationDeg,
        );
        const nextY = wrapAngleSigned(
          startRotRef.current.y + dxTotal / responsiveConfig.dragSensitivity,
        );
        if (
          rotationRef.current.x !== nextX ||
          rotationRef.current.y !== nextY
        ) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }
        if (last) {
          draggingRef.current = false;
          let [vMagX, vMagY] = velocity;
          const [dirX, dirY] = direction;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;
          if (
            Math.abs(vx) < 0.001 &&
            Math.abs(vy) < 0.001 &&
            Array.isArray(movement)
          ) {
            const [mx, my] = movement;
            vx = clamp(
              (mx / responsiveConfig.dragSensitivity) * 0.02,
              -1.2,
              1.2,
            );
            vy = clamp(
              (my / responsiveConfig.dragSensitivity) * 0.02,
              -1.2,
              1.2,
            );
          }
          if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)
            startInertia(vx, vy);
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      },
    },
    {
      target: mainRef,
      eventOptions: { passive: true },
      enabled: !disableMotion,
    },
  );

  const closeOverlay = useCallback(() => {
    if (disableMotion) return;
    if (performance.now() - openStartedAtRef.current < 250) return;

    const el = focusedElRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const rootEl = rootRef.current;
    if (!rootEl) return;

    const overlay = viewerRef.current?.querySelector(`.${styles.enlarge}`);
    if (!(overlay instanceof HTMLElement)) return;

    const refDiv = parent.querySelector(`.${styles["item__image--reference"]}`);

    const originalPos = originalTilePositionRef.current;
    if (!originalPos) {
      overlay.remove();
      if (refDiv instanceof HTMLElement) refDiv.remove();
      parent.style.setProperty("--rot-y-delta", "0deg");
      parent.style.setProperty("--rot-x-delta", "0deg");
      el.style.visibility = "";
      el.style.zIndex = "0";
      focusedElRef.current = null;
      delete rootEl.dataset.enlarging;
      openingRef.current = false;
      unlockScroll();
      return;
    }

    const currentRect = overlay.getBoundingClientRect();
    const rootRect = rootEl.getBoundingClientRect();

    const originalPosRelativeToRoot = {
      left: originalPos.left - rootRect.left,
      top: originalPos.top - rootRect.top,
      width: originalPos.width,
      height: originalPos.height,
    };

    const overlayRelativeToRoot = {
      left: currentRect.left - rootRect.left,
      top: currentRect.top - rootRect.top,
      width: currentRect.width,
      height: currentRect.height,
    };

    const animatingOverlay = document.createElement("div");
    animatingOverlay.className = styles["enlarge-closing"];
    animatingOverlay.style.cssText = `position:absolute;left:${overlayRelativeToRoot.left}px;top:${overlayRelativeToRoot.top}px;width:${overlayRelativeToRoot.width}px;height:${overlayRelativeToRoot.height}px;z-index:9999;border-radius: var(--enlarge-radius, 32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all ${enlargeTransitionMs}ms ease-out;pointer-events:none;margin:0;transform:none;`;

    const originalImg = overlay.querySelector("img");
    if (originalImg instanceof HTMLImageElement) {
      const img = originalImg.cloneNode(true) as HTMLImageElement;
      img.style.cssText = "width:100%;height:100%;object-fit:cover;";
      animatingOverlay.appendChild(img);
    }

    overlay.remove();
    rootEl.appendChild(animatingOverlay);
    animatingOverlay.getBoundingClientRect();

    requestAnimationFrame(() => {
      animatingOverlay.style.left = originalPosRelativeToRoot.left + "px";
      animatingOverlay.style.top = originalPosRelativeToRoot.top + "px";
      animatingOverlay.style.width = originalPosRelativeToRoot.width + "px";
      animatingOverlay.style.height = originalPosRelativeToRoot.height + "px";
      animatingOverlay.style.opacity = "0";
    });

    const cleanup = () => {
      animatingOverlay.remove();
      originalTilePositionRef.current = null;
      if (refDiv instanceof HTMLElement) refDiv.remove();
      parent.style.transition = "none";
      el.style.transition = "none";
      parent.style.setProperty("--rot-y-delta", "0deg");
      parent.style.setProperty("--rot-x-delta", "0deg");

      const finishClose = () => {
        el.style.transition = "";
        el.style.opacity = "";
        openingRef.current = false;
        if (!draggingRef.current && rootEl.dataset.enlarging !== "true") {
          document.body.classList.remove("dg-scroll-lock");
        }
      };

      const step1 = () => {
        el.style.visibility = "";
        el.style.opacity = "0";
        el.style.zIndex = "0";
        focusedElRef.current = null;
        delete rootEl.dataset.enlarging;
      };

      const step2 = () => {
        parent.style.transition = "";
        el.style.transition = "opacity 300ms ease-out";
      };

      const step3 = () => {
        el.style.opacity = "1";
        globalThis.setTimeout(finishClose, 300);
      };

      runInAnimationFrames([step1, step2, step3]);
    };

    animatingOverlay.addEventListener("transitionend", cleanup, { once: true });
  }, [disableMotion, enlargeTransitionMs, unlockScroll]);

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;

    scrim.addEventListener("click", closeOverlay);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };
    globalThis.addEventListener?.("keydown", onKey);

    return () => {
      scrim.removeEventListener("click", closeOverlay);
      globalThis.removeEventListener?.("keydown", onKey);
    };
  }, [closeOverlay]);

  const openItemFromElement = useCallback(
    (el: HTMLButtonElement) => {
      if (disableMotion) return;
      if (openingRef.current) return;
      openingRef.current = true;
      openStartedAtRef.current = performance.now();
      lockScroll();
      const parent = el.parentElement;
      if (!parent) {
        openingRef.current = false;
        unlockScroll();
        return;
      }
      focusedElRef.current = el;
      el.dataset.focused = "true";
      const offsetX = getDataNumber(parent, "offsetX", 0);
      const offsetY = getDataNumber(parent, "offsetY", 0);
      const sizeX = getDataNumber(parent, "sizeX", 2);
      const sizeY = getDataNumber(parent, "sizeY", 2);
      const parentRot = computeItemBaseRotation(
        offsetX,
        offsetY,
        sizeX,
        sizeY,
        responsiveConfig.segments,
      );
      const parentY = normalizeAngle(parentRot.rotateY);
      const globalY = normalizeAngle(rotationRef.current.y);
      let rotY = -(parentY + globalY) % 360;
      if (rotY < -180) rotY += 360;
      const rotX = -parentRot.rotateX - rotationRef.current.x;
      parent.style.setProperty("--rot-y-delta", `${rotY}deg`);
      parent.style.setProperty("--rot-x-delta", `${rotX}deg`);
      const refDiv = document.createElement("div");
      refDiv.className = `${styles["item__image"]} ${styles["item__image--reference"]}`;
      refDiv.style.opacity = "0";
      refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
      parent.appendChild(refDiv);

      refDiv.getBoundingClientRect();

      const tileR = refDiv.getBoundingClientRect();
      const mainR = mainRef.current?.getBoundingClientRect();
      const frameR = frameRef.current?.getBoundingClientRect();

      if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
        openingRef.current = false;
        focusedElRef.current = null;
        refDiv.remove();
        unlockScroll();
        return;
      }

      originalTilePositionRef.current = {
        left: tileR.left,
        top: tileR.top,
        width: tileR.width,
        height: tileR.height,
      };
      el.style.visibility = "hidden";
      el.style.zIndex = "0";
      const overlay = document.createElement("div");
      overlay.className = styles.enlarge;
      overlay.style.position = "absolute";
      overlay.style.left = frameR.left - mainR.left + "px";
      overlay.style.top = frameR.top - mainR.top + "px";
      overlay.style.width = frameR.width + "px";
      overlay.style.height = frameR.height + "px";
      overlay.style.opacity = "0";
      overlay.style.zIndex = "30";
      overlay.style.willChange = "transform, opacity";
      overlay.style.transformOrigin = "top left";
      overlay.style.transition = `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`;
      const rawSrc = parent.dataset.src || el.querySelector("img")?.src || "";
      const img = document.createElement("img");
      img.src = rawSrc;
      overlay.appendChild(img);
      if (!viewerRef.current) {
        openingRef.current = false;
        focusedElRef.current = null;
        refDiv.remove();
        unlockScroll();
        return;
      }
      viewerRef.current.appendChild(overlay);
      const tx0 = tileR.left - frameR.left;
      const ty0 = tileR.top - frameR.top;
      const sx0 = tileR.width / frameR.width;
      const sy0 = tileR.height / frameR.height;

      const validSx0 = Number.isFinite(sx0) && sx0 > 0 ? sx0 : 1;
      const validSy0 = Number.isFinite(sy0) && sy0 > 0 ? sy0 : 1;

      overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;

      setTimeout(() => {
        if (!overlay.parentElement) return;
        overlay.style.opacity = "1";
        overlay.style.transform = "translate(0px, 0px) scale(1, 1)";
        if (rootRef.current) rootRef.current.dataset.enlarging = "true";
      }, 16);

      const wantsResize = openedImageWidth || openedImageHeight;
      if (wantsResize) {
        const onFirstEnd = (ev: TransitionEvent) => {
          if (ev.propertyName !== "transform") return;
          overlay.removeEventListener("transitionend", onFirstEnd);
          const prevTransition = overlay.style.transition;
          overlay.style.transition = "none";
          const tempWidth = openedImageWidth || `${frameR.width}px`;
          const tempHeight = openedImageHeight || `${frameR.height}px`;
          overlay.style.width = tempWidth;
          overlay.style.height = tempHeight;
          const newRect = overlay.getBoundingClientRect();
          overlay.style.width = frameR.width + "px";
          overlay.style.height = frameR.height + "px";
          overlay.getBoundingClientRect();
          overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
          const centeredLeft =
            frameR.left - mainR.left + (frameR.width - newRect.width) / 2;
          const centeredTop =
            frameR.top - mainR.top + (frameR.height - newRect.height) / 2;
          requestAnimationFrame(() => {
            overlay.style.left = `${centeredLeft}px`;
            overlay.style.top = `${centeredTop}px`;
            overlay.style.width = tempWidth;
            overlay.style.height = tempHeight;
          });
          const cleanupSecond = () => {
            overlay.removeEventListener("transitionend", cleanupSecond);
            overlay.style.transition = prevTransition;
          };
          overlay.addEventListener("transitionend", cleanupSecond, {
            once: true,
          });
        };
        overlay.addEventListener("transitionend", onFirstEnd);
      }
    },
    [
      disableMotion,
      enlargeTransitionMs,
      lockScroll,
      openedImageHeight,
      openedImageWidth,
      responsiveConfig.segments,
      unlockScroll,
    ],
  );

  const onTileClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (disableMotion) return;
      if (draggingRef.current) return;
      if (movedRef.current) return;
      if (performance.now() - lastDragEndAt.current < 80) return;
      if (openingRef.current) return;
      openItemFromElement(e.currentTarget);
    },
    [disableMotion, openItemFromElement],
  );

  const onTilePointerUp = useCallback(
    (e: PointerEvent<HTMLButtonElement>) => {
      if (disableMotion) return;
      if (e.pointerType !== "touch") return;
      if (draggingRef.current) return;
      if (movedRef.current) return;
      if (performance.now() - lastDragEndAt.current < 80) return;
      if (openingRef.current) return;
      openItemFromElement(e.currentTarget);
    },
    [disableMotion, openItemFromElement],
  );

  useEffect(() => {
    return () => {
      document.body.classList.remove("dg-scroll-lock");
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles["sphere-root"]}
      style={
        {
          ["--segments-x" as never]: responsiveConfig.segments,
          ["--segments-y" as never]: responsiveConfig.segments,
          ["--overlay-blur-color" as never]: overlayBlurColor,
          ["--tile-radius" as never]: imageBorderRadius,
          ["--enlarge-radius" as never]: openedImageBorderRadius,
          ["--image-filter" as never]: grayscale ? "grayscale(1)" : "none",
        } as unknown as CSSProperties
      }
    >
      <main ref={mainRef} className={styles["sphere-main"]}>
        <div className={styles.stage}>
          <div ref={sphereRef} className={styles.sphere}>
            {items.map((it, i) => (
              <div
                key={`${it.x},${it.y},${i}`}
                className={styles.item}
                data-src={it.src}
                data-offset-x={it.x}
                data-offset-y={it.y}
                data-size-x={it.sizeX}
                data-size-y={it.sizeY}
                style={
                  {
                    ["--offset-x" as never]: it.x,
                    ["--offset-y" as never]: it.y,
                    ["--item-size-x" as never]: it.sizeX,
                    ["--item-size-y" as never]: it.sizeY,
                  } as unknown as CSSProperties
                }
              >
                <button
                  type="button"
                  className={styles["item__image"]}
                  aria-label={it.alt || "Open image"}
                  onClick={onTileClick}
                  onPointerUp={onTilePointerUp}
                >
                  <img src={it.src} draggable={false} alt={it.alt} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.viewer} ref={viewerRef}>
          <div ref={scrimRef} className={styles.scrim} />
          <div ref={frameRef} className={styles.frame} />
        </div>
      </main>
    </div>
  );
}

export default function PartnersGallery(props: Readonly<PartnersGalleryProps>) {
  const isMobile = useIsMobile(480);

  if (isMobile) {
    return (
      <PartnersGalleryFlat
        images={props.images ?? DEFAULT_IMAGES}
        imageBorderRadius={props.imageBorderRadius ?? "30px"}
        grayscale={props.grayscale ?? true}
      />
    );
  }

  return <PartnersGallerySphere {...props} />;
}
