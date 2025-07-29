interface HighlightedTextSpanProps {
  text: string;
  keyword: string;
  highlightedClassName: string;
}

export default function HighlightedTextSpan({ text, keyword, highlightedClassName }: HighlightedTextSpanProps) {
  const trimmedKeyword = keyword.trim();
  if (trimmedKeyword === '') return <>{text}</>;

  const index = text.indexOf(trimmedKeyword);
  if (index === -1) return <>{text}</>;

  const before = text.slice(0, index);
  const matched = text.slice(index, index + trimmedKeyword.length);
  const after = text.slice(index + trimmedKeyword.length);

  return (
    <>
      {before}
      <strong className={highlightedClassName}>{matched}</strong>
      {after}
    </>
  );
}
