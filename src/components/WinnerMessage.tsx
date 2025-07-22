import React from "react";

interface WinnerMessageProps {
  winner: "R" | "Y";
  onReset: () => void;
}

const WinnerMessage: React.FC<WinnerMessageProps> = ({ winner, onReset }) => (
  <>
    <p className="text-2xl font-semibold text-green-400">
      🎉 Player {winner === "R" ? "Red" : "Yellow"} wins!
    </p>
    <button
      className="mt-2 px-4 py-2 rounded bg-white text-blue-800 font-bold hover:bg-gray-100"
      onClick={onReset}
    >
      Play Again
    </button>
  </>
);

export default WinnerMessage; 