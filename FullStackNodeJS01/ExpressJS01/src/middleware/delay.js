export function delay(ms = 500) {
  return (req, res, next) => setTimeout(next, ms);
}
