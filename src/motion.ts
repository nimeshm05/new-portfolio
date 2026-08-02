export const SIDEBAR_BLUR = "12px";

export const SIDEBAR_BLUR_TRANSITION = {
  type: "spring" as const,
  stiffness: 80,
  damping: 8,
  mass: 0.6,
};

export const SIDEBAR_BLUR_VARIANTS = {
  hidden: { filter: `blur(${SIDEBAR_BLUR})` },
  show: {
    filter: "blur(0px)",
    transition: SIDEBAR_BLUR_TRANSITION,
  },
};

export const PREVIEW_VIDEO_TRANSITION = {
  duration: 0.08,
  ease: "easeOut" as const,
};

export const PREVIEW_VIDEO_VARIANTS = {
  hidden: {
    filter: `blur(${SIDEBAR_BLUR})`,
    scale: 0.9,
  },
  show: {
    filter: "blur(0px)",
    scale: 1,
    transition: PREVIEW_VIDEO_TRANSITION,
  },
};
