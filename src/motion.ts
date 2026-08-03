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

export const SIDEBAR_PILL_TRANSITION = {
  type: "spring" as const,
  stiffness: 300,
  damping: 28,
  mass: 0.85,
};

export const TAB_CONTENT_BLUR = "2px";

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

const SLIDE_EASE = [0.32, 0.72, 0, 1] as const;

/** Sidebar slides left on project open, right on close. */
export const PAGE_SLIDE_TRANSITION = {
  duration: 0.36,
  ease: SLIDE_EASE,
};

export const SIDEBAR_RAIL_VARIANTS = {
  open: {
    x: 0,
    flexBasis: "18%",
    maxWidth: "18%",
    transition: PAGE_SLIDE_TRANSITION,
  },
  closed: {
    x: "-100%",
    flexBasis: 0,
    maxWidth: 0,
    transition: PAGE_SLIDE_TRANSITION,
  },
};
