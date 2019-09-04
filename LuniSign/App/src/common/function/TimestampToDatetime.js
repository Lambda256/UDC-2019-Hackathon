const TimestampToDatetime = timestamp => {
  const tempDate = new Date(timestamp * 1000);
  return tempDate.toLocaleDateString() + tempDate.toLocaleTimeString();
};

export const TimestampToDatetimeLocale = timestamp => {
  const tempDate = new Date(timestamp);
  return tempDate.toLocaleDateString() + tempDate.toLocaleTimeString();
};

export default TimestampToDatetime;
