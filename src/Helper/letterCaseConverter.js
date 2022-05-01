function caseConverter(text) {
  const convertedText = text.charAt(0) + text.toLowerCase().slice(1);
  return convertedText;
}

export default caseConverter;
