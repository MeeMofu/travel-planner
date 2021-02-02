export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

export function durationFormater(duration) {
  // Remove PT at start and split into hour and minutes
  const time = duration.slice(2).split("H");
  const min = time[1].replace("M","");
  return `${time[0]}h ${ min ? min :'00'}m`
}