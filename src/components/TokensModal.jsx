import words from "../words.json";
import Button from "./Button";

const TokensModal = ({ show, onClose }) => {
  return (
    <div
      className={`fixed overflow-y-auto p-5 bg-black/70 inset-9 rounded-md backdrop-blur-md transition-all duration-200 ${
        !show
          ? "opacity-0 invisible -translate-y-10"
          : "opacity-100 visible translate-x-0"
      }`}
    >
      <div className="flex justify-between items-center ">
        <h2 className="text-white text-3xl my-2">Tokens </h2>
        <Button onClick={onClose} className="px-3 py-2 ">
          X
        </Button>
      </div>
      <hr />
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="text-white py-5">Tokens</th>
            <td className="text-white py-5"></td>
            <th className="text-white py-5">Replacements</th>
          </tr>
        </thead>
        <tbody>
          {words?.map((word) => {
            return (
              <tr key={JSON.stringify(word)} className="border-b">
                <td className="py-4" align="center">
                  <div className="flex flex-wrap items-center justify-center">
                    {word.tokens?.map((token) => (
                      <span className="bg-white text-black px-3 py-1 rounded m-0.5 ">
                        {token}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="text-white">{"-->"}</td>
                <td className="py-4" align="center">
                  <div className="flex flex-wrap items-center justify-center">
                    {word.replace.map((resp) => (
                      <span className="bg-white text-black px-3 py-1 rounded m-0.5 ">
                        {resp}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TokensModal;
