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
  const [copied, setCopied] = useState(false);

  const parsedInput = useMemo(() => {
    let text = input;
    words.forEach((word) => {
      text = replaceWordsWithRandom(text, word.token, word.replace);
    });
    return text;
  }, [input]);

  const handleClipboardCopy = () => {
    if (parsedInput) {
      navigator.clipboard
        .writeText(parsedInput)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 3000);
        })
        .catch((error) => {
          alert("Something went wrong");
        });
    }
  };

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
              <div className="flex items-center justify-between">
                <label>Output: </label>
                <div>
                  {copied ? (
                    <span className="mr-4 text-green-500 font-bold text-xs">
                      Text Copied
                    </span>
                  ) : null}
                  <button
                    onClick={handleClipboardCopy}
                    className="text-xs px-2 py-1 bg-black text-white rounded hover:bg-black/50 active:scale-95"
                  >
                    Copy to Clipboard
                  </button>
                </div>
              </div>
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
