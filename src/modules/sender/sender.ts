import { sendStatsInterface } from "./types";

export const sendStats = ({ name, id, additionalInfo }: sendStatsInterface): void => {
  // Отправляем стату
  console.log({ name, id, additionalInfo });
}
