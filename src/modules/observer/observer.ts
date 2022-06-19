import { slotsObserverInterface } from "./types";

const defaults = {
  rootMargin: '0px',
  threshold: 0,
};

export const slotsObserver = ({ onSlotVisible, options }: slotsObserverInterface): IntersectionObserver => {
  const callback = function(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (!(entry.target instanceof HTMLElement)) return;

      const { isIntersecting } = entry;

      entry.target.dataset.isInView = `${isIntersecting}`;

      if (isIntersecting) {
        if (onSlotVisible) {
          onSlotVisible(entry.target);
        }
      }
    });
  };

  const config = { ...defaults, ...options };

  return new IntersectionObserver(callback, config);
};
