export function replaceWordsWithRandom(text, token, replacements) {
  const regex = new RegExp(token.toLowerCase(), "gi");
  const randomIndex = Math.floor(Math.random() * replacements.length);
  const randomReplacement = replacements[randomIndex].toLowerCase();
  const modifiedText = text.replace(regex, randomReplacement);

  return modifiedText;
}

export function replaceWordsWithReverse(text, token) {
  const regex = new RegExp(token.toLowerCase(), "gi");
  const splitGraphemes = Array.from(
    new Intl.Segmenter("bn", { granularity: "grapheme" }).segment(token)
  );

  const reversedGraphemes = splitGraphemes.reverse();
  const reversedString = reversedGraphemes
    .map((segment) => segment.segment)
    .join("");
  const modifiedText = text.replace(regex, `"${reversedString} (উল্টে পড়ুন)"`);

  return modifiedText;
}
