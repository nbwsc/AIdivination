export function encodeName(n) {
  if (!n) {
    return "";
  }
  return encodeURIComponent(n.toLowerCase());
}
