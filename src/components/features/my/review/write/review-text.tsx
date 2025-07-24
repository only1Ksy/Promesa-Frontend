interface ReviewTextAreaProps {
  content: string;
  setContent: (value: string) => void;
}

export default function ReviewText({ content, setContent }: ReviewTextAreaProps) {
  return (
    <textarea
      placeholder="리뷰 내용을 입력해 주세요"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="mb-6 resize-none rounded border border-gray-300 p-[10px]"
      style={{
        display: 'flex',
        width: '362px',
        height: '120px',
        alignItems: 'flex-start',
        gap: '10px',
        flexShrink: 0,
      }}
    />
  );
}
