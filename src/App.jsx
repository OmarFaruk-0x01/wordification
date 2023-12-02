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

function replaceWordsWithReverse(text, token) {
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

const App = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [replaceType, setReplaceType] = useState("reverse");
  const [copied, setCopied] = useState(false);

  const parsedInput = () => {
    let text = input;
    words.forEach((word) => {
      for (const token of word.tokens) {
        if (replaceType == "random") {
          text = replaceWordsWithRandom(text, token, word.replace);
        } else {
          text = replaceWordsWithReverse(text, token);
        }
      }
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
    <div className="container p-5 sm:p-10 font-mono w-full">
      <h3 className="text-xl sm:text-5xl font-semibold text-center">
        Wordification
      </h3>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
        <div>
          <textarea
            onChange={(ev) => {
              setInput(ev.target.value);
            }}
            className="p-5 w-full mt-9 border rounded-md outline-none focus-visible:border-black min-h-[300px]"
            placeholder="Write Your Text"
            value={input}
          ></textarea>
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <div className="flex flex-wrap items-center mb-4">
                <input
                  id="reverse"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 checked:bg-blue-200"
                  checked={replaceType == "reverse"}
                  onChange={(ev) => {
                    setReplaceType("reverse");
                  }}
                />
                <label
                  htmlFor="reverse"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Reverse Words
                </label>
              </div>
              <div className="flex flex-wrap items-center mb-4">
                <input
                  id="random"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 checked:bg-blue-200"
                  checked={replaceType == "random"}
                  onChange={(ev) => {
                    setReplaceType("random");
                  }}
                />
                <label
                  htmlFor="random"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Randomize Words
                </label>
              </div>
            </div>
            <Button onClick={parsedInput} className="text-base">
              Replace
            </Button>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap items-center justify-between">
            <label></label>
            <div>
              {copied ? (
                <span className="mr-4 text-green-500 font-bold text-xs">
                  Text Copied
                </span>
              ) : null}
              <Button onClick={handleClipboardCopy}>Copy to Clipboard</Button>
            </div>
          </div>
          <div
            className={`p-5 w-full mt-2 border rounded-md outline-none min-h-[300px] ${
              output ? "border-black" : "border"
            }`}
            placeholder="messages"
          >
            {output}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
