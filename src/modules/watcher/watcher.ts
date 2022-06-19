import { slotType } from "../../types";
import { slotsWatcherInterface } from "./types";

const slotRole = 'user-stats';
const slotSelector = `[data-role="${slotRole}"]`;

/**
 * Хелпер поиска дочерних элементов слотов
 * @param node эелемент, в ктором производится поиск
 * @return {NodeListOf<HTMLElement>}
 */
const findSlots = (node: HTMLElement = document.body): NodeListOf<HTMLElement> => {
  return node.querySelectorAll(slotSelector);
};

const findSlotsInMutationNodeList = ({ addedNodes }: { addedNodes: Node[] }): HTMLElement[] => {
  const slots: HTMLElement[] = [];

  addedNodes.forEach((node) => {
    if (!(node instanceof HTMLElement)) {
      return null;
    }

    const isSlotNode = node.dataset?.role === slotRole;

    if (isSlotNode) {
      slots.push(node);
    }

    const childrenSlots = findSlots(node);

    slots.push(...childrenSlots);
  });

  return slots;
};

export const slotsWatcher = ({ onSlotFound }: slotsWatcherInterface) => {
  const onSlotFoundRun = (slot: slotType) => {
    const { isCatched } = slot.dataset;

    if(isCatched){
      return false;
    }

    onSlotFound(slot);

    slot.dataset.isCatched = 'true';
  };

  const foundSlots = findSlots();

  foundSlots.forEach((slot) => onSlotFoundRun(slot));

  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      const addedNodes = [...mutation.addedNodes];

      const foundMutationSlots = findSlotsInMutationNodeList({ addedNodes });

      foundMutationSlots.forEach((slot) => onSlotFoundRun(slot));
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
};
