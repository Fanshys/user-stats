export interface slotsObserverInterface {
  onSlotVisible: (slot: HTMLElement) => void;
  options?: IntersectionObserverInit;
}
