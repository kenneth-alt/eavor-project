const PrevButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="mx-2 px-4 py-2 rounded-full bg-transparent border border-grey-500 text-stone-400"
  >
    Previous
  </button>
);

const NextButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="mx-2 px-4 py-2 rounded-full bg-transparent border border-grey-500 text-stone-400"
  >
    Next
  </button>
);

export { PrevButton, NextButton };
