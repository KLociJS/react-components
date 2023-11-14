export default function CharacterCounter({ min, max, currentValue }) {
  const lengthClass = currentValue >= min && currentValue <= max ? "" : "error";

  if (min === undefined || max === undefined) return null;
  return (
    <p className={`textarea-counter ${lengthClass}`}>
      {currentValue}/{max}
    </p>
  );
}
