export default function priceFormatter(value: number) {
  return "$" + (value / 1000).toLocaleString("de-DE") + "k";
}
