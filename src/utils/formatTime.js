export const formatTime = (timeStamp) => {
  return new Intl.DateTimeFormat("en-IN").format(timeStamp);
};
