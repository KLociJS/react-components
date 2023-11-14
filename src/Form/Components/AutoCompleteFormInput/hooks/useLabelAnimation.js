import { useState } from "react";

export default function useLabelAnimation(
  setIsSuggestionSelected,
  setHighlightedIndex
) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setHighlightedIndex(0);
    setIsFocused(true);
    setIsSuggestionSelected(false);
  };
  const handleBlur = () => {
    setHighlightedIndex(-1);
    setIsFocused(false);
    setIsSuggestionSelected(true);
  };
  return {
    isFocused,
    handleFocus,
    handleBlur,
  };
}
