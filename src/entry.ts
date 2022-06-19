import { setEvents } from "./modules";
import { slotsObserver } from "./modules";
import { slotsWatcher } from "./modules";

const init = (): void => {
  const slotsObserverInstance = slotsObserver({
    onSlotVisible: (slot) => {
      const event = new CustomEvent('slotVisible');

      slot.dispatchEvent(event);
    },
  })
  /**
   * Иницилизация наблюдателя за изменениями в DOM.
   * Запуск onSlotFound при обнаружении слота
   * При инициализации onSlotFound запускается для уже добавленных в DOM слотов.
   */
  slotsWatcher({
    onSlotFound: (slot) => {
      setEvents({ slot, observer: slotsObserverInstance });
    },
  });
}

init();
