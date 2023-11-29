import { useState } from "react";
import Button from "./components/Button";
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
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const parsedInput = () => {
    let text = input;
    words.forEach((word) => {
      text = replaceWordsWithRandom(text, word.token, word.replace);
    });
    setOutput(text);
  };

  const handleClipboardCopy = () => {
    if (output) {
      navigator.clipboard
        .writeText(output)
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
              <div className="flex items-center justify-between">
                <label>Input: </label>
                <Button onClick={parsedInput}>Convert ></Button>
              </div>
              <textarea
                onChange={(ev) => {
                  setInput(ev.target.value);
                }}
                className="p-5 w-full mt-2 border rounded-md outline-none focus-visible:border-blue-200 min-h-[300px]"
                placeholder="messages"
                value={input}
              ></textarea>
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
                  <Button onClick={handleClipboardCopy}>
                    Copy to Clipboard
                  </Button>
                </div>
              </div>
              <div
                className="p-5 w-full mt-2 border rounded-md outline-none focus-visible:border-blue-200 min-h-[300px]"
                placeholder="messages"
              >
                {output}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
