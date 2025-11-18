// utils/highlight.js
export const escapeRegex = (str) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const highlight = (text, keywordString) => {
  if (!keywordString?.trim() || !text) return text;

  const keywords = keywordString
    .split(/[\s,]+/)
    .filter((k) => k.trim() !== "");

  if (keywords.length === 0) return text;

  const regex = new RegExp(`(${keywords.map(escapeRegex).join("|")})`, "gi");

  return text.replace(regex, `<mark class='bg-yellow-200'>$1</mark>`);
};
