import { useEffect, useState } from "react";

const fetchSuggestions = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default function useAutoComplete(
  handleChange,
  name,
  deBouncedInputValue,
  autoCompleteFetchUrl
) {
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((i) =>
        i < autoCompleteSuggestions.length - 1 ? i + 1 : i
      );
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((i) => (i > 0 ? i - 1 : 0));
      e.preventDefault();
    } else if (
      e.key === "Enter" &&
      highlightedIndex > -1 &&
      autoCompleteSuggestions.length !== 0
    ) {
      handleChange({
        target: { name, value: autoCompleteSuggestions[highlightedIndex].name },
      });
      setAutoCompleteSuggestions([]);
      setIsSuggestionSelected(true);
      e.preventDefault();
    } else if (e.key === "Enter" && autoCompleteSuggestions.length !== 0) {
      handleChange({
        target: { name, value: autoCompleteSuggestions[0].name },
      });
      setAutoCompleteSuggestions([]);
      setIsSuggestionSelected(true);
      e.preventDefault();
    } else if (e.key === "Enter" && autoCompleteSuggestions.length === 0) {
      setIsSuggestionSelected(true);
      e.preventDefault();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleChange({ target: { name, value: suggestion.name } });
    setAutoCompleteSuggestions([]);
    setIsSuggestionSelected(true);
  };

  const handleInputChange = (e) => {
    handleChange(e);
    setIsSuggestionSelected(false);
  };

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const data = await fetchSuggestions(
          `${autoCompleteFetchUrl}${deBouncedInputValue}`
        );
        const slicedData = data.slice(0, 10);
        setAutoCompleteSuggestions(slicedData);
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
      }
    };

    if (deBouncedInputValue) {
      getSuggestions();
    } else {
      setAutoCompleteSuggestions([]);
    }
  }, [deBouncedInputValue, autoCompleteFetchUrl]);
  return {
    handleKeyDown,
    isSuggestionSelected,
    setIsSuggestionSelected,
    highlightedIndex,
    setHighlightedIndex,
    autoCompleteSuggestions,
    handleSuggestionClick,
    handleInputChange,
  };
}
