import { sendStats } from "../";
import { setEventsInterface } from "./types";

export const setEvents = ({ slot, observer }: setEventsInterface ): void => {
  const { userStatsClick, userStatsShow } = slot.dataset;

  if (userStatsClick) {
    const clickHandler = () => {
      sendStats({
        id: slot.id,
        name: userStatsClick
      });
    }

    slot.addEventListener('click', clickHandler);
  }

  if (userStatsShow) {
    const showHandler = () => {
      sendStats({
        id: slot.id,
        name: userStatsShow
      });
    }

    observer.observe(slot);

    slot.addEventListener('slotVisible', showHandler);
  }
}
