// TODO: Will make it generic
export const getFormattedTime = (timestamp: string) => {
  const date = new Date(timestamp);

  const options = {
    weekday: "short" as "short",
    year: "numeric" as "numeric",
    month: "short" as "short",
    day: "numeric" as "numeric",
    hour: "numeric" as "numeric",
    minute: "numeric" as "numeric",
    hour12: true,
  };

  const formattedDate = date.toLocaleString("en-GB", { ...options });
  return formattedDate;
};
