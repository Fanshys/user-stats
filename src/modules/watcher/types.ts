import { slotType } from "../../types";

export interface slotsWatcherInterface {
  onSlotFound: (slot: slotType) => void;
}
