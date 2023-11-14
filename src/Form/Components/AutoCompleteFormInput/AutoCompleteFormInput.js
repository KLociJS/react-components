import { useFormContext } from "../../FormContext/FormContext";
import useDebounceValue from "../../hooks/useDebounceValue";
import DisplayError from "../DisplayError/DisplayError";
import "../Input.css";
import "./AutoCompleteFormInput.css";
import useAutoComplete from "./hooks/useAutoComplete";
import useLabelAnimation from "./hooks/useLabelAnimation";

const AutoCompleteFormInput = ({
  label,
  name,
  type,
  isDisabled = false,
  autoCompleteFetchUrl,
}) => {
  const { values, errors, handleChange } = useFormContext();

  const deBouncedInputValue = useDebounceValue(values[name], 300);

  const {
    handleKeyDown,
    isSuggestionSelected,
    setIsSuggestionSelected,
    highlightedIndex,
    setHighlightedIndex,
    autoCompleteSuggestions,
    handleSuggestionClick,
    handleInputChange,
  } = useAutoComplete(
    handleChange,
    name,
    deBouncedInputValue,
    autoCompleteFetchUrl
  );

  const { isFocused, handleFocus, handleBlur } = useLabelAnimation(
    setIsSuggestionSelected,
    setHighlightedIndex
  );

  const disabledClass = isDisabled ? "disabled" : "";
  const activeClass = isFocused || values[name] ? "active" : "";
  const errorsClass = errors?.[name] ? "error" : "";

  return (
    <div className={`input-group ${errorsClass}`}>
      <label className={`animated-label ${activeClass} ${disabledClass}`}>
        {label}
      </label>
      <input
        disabled={isDisabled}
        name={name}
        type={type}
        value={values[name]}
        className='input-control'
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoComplete='off'
        aria-autocomplete='list'
        aria-controls='autocomplete-options'
        aria-activedescendant={
          highlightedIndex > -1
            ? `autocomplete-option-${highlightedIndex}`
            : undefined
        }
      />
      {isSuggestionSelected || autoCompleteSuggestions.length === 0 ? null : (
        <ul
          id='autocomplete-options'
          role='listbox'
          className='suggestions-list'
        >
          {autoCompleteSuggestions.map((suggestion, i) => (
            <li
              key={i}
              id={`autocomplete-option-${suggestion.id}`}
              role='option'
              aria-selected={highlightedIndex === i}
              className={`suggestion-item ${
                highlightedIndex === i ? "highlighted" : ""
              }`}
              onMouseDown={() => {
                handleSuggestionClick(suggestion);
              }}
              onMouseEnter={() => setHighlightedIndex(i)}
              onMouseLeave={() => setHighlightedIndex(-1)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
      <DisplayError errors={errors[name]} />
    </div>
  );
};

export default AutoCompleteFormInput;
