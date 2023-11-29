import { useMemo, useState } from "react";
import words from "./words.json";

function replaceWordsWithRandom(text, token, replacements) {
  const regex = new RegExp(token.toLowerCase(), "gi");
  const randomIndex = Math.floor(Math.random() * replacements.length);
  const randomReplacement = replacements[randomIndex].toLowerCase();
  const modifiedText = text.replace(regex, randomReplacement);

  return modifiedText;
}

const App = () => {
  const [input, setInput] = useState("");

  const parsedInput = useMemo(() => {
    let text = input;
    words.forEach((word) => {
      text = replaceWordsWithRandom(text, word.token, word.replace);
    });
    return text;
  }, [input]);

  return (
    <>
      <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="block">Input: </label>
              <textarea
                onChange={(ev) => {
                  setInput(ev.target.value);
                }}
                className="p-5 w-full mt-2 border rounded-md outline-none focus-visible:border-blue-200 min-h-[300px]"
                placeholder="messages"
              >
                {input}
              </textarea>
            </div>
            <div>
              <label>Output: </label>
              <div
                className="p-5 w-full mt-2 border rounded-md outline-none focus-visible:border-blue-200 min-h-[300px]"
                placeholder="messages"
              >
                {parsedInput}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
