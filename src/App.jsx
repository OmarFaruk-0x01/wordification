import { useEffect, useState } from "react";
import Button from "./components/Button";
import TokensModal from "./components/TokensModal";
import useOnClickOutside from "./hooks/use-click-outside";
import useHotkeys from "./hooks/use-hot-keys";
import { replaceWordsWithRandom, replaceWordsWithReverse } from "./utils";

const wordsApi = () =>
  fetch(
    `https://raw.githubusercontent.com/OmarFaruk-0x01/wordification/main/src/words.json`
  ).then((data) => data.json());

const App = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [replaceType, setReplaceType] = useState("reverse");
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);
  const [words, setWords] = useState([]);
  const { ref } = useOnClickOutside(() => {
    setShow(false);
  });

  useHotkeys([
    [
      "escape",
      () => {
        setShow(false);
      },
    ],
  ]);

  useEffect(() => {
    wordsApi().then((data) => {
      setWords(data);
    });
  }, []);

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
    <>
      <div ref={ref} className="container p-5 sm:p-10 font-mono w-full">
        <TokensModal
          show={show}
          onClose={() => {
            setShow(false);
          }}
        />
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
            <div className="flex flex-wrap items-center justify-between mt-2">
              <label></label>
              <div>
                <Button
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  Tokens
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
