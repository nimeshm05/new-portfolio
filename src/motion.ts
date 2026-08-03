export const SIDEBAR_BLUR = "4px";

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

export const TAB_CONTENT_BLUR = "4px";

export const TAB_CONTENT_BLUR_VARIANTS = {
  hidden: {
    opacity: 0,
    filter: `blur(${TAB_CONTENT_BLUR})`,
  },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.22,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    filter: `blur(${TAB_CONTENT_BLUR})`,
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    transition: {
      duration: 0.1,
      ease: "easeIn" as const,
    },
  },
};

/** In-place media crossfade for project details (opacity + blur only). */
export const DETAILS_MEDIA_VARIANTS = {
  hidden: {
    opacity: 0,
    filter: `blur(${TAB_CONTENT_BLUR})`,
  },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.22,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    filter: `blur(${TAB_CONTENT_BLUR})`,
    transition: {
      duration: 0.1,
      ease: "easeIn" as const,
    },
  },
};
