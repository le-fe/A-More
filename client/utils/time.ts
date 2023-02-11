import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function timeagoText(timevalue?: string) {
  if (!timevalue) return "";
  return dayjs(timevalue).fromNow();
}
