interface ReviewTextAreaProps {
  content: string;
  setContent: (value: string) => void;
}

export default function ReviewText({ content, setContent }: ReviewTextAreaProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-body-02 flex gap-0.5 font-medium">
        <span className="text-black">상세 리뷰를 작성해주세요.</span>
        <span className="text-grey-5">(선택)</span>
      </div>{' '}
      <textarea
        placeholder="어떤 점이 좋았나요? 10자 이상 작성해주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="bg-green text-body-02 font-regular flex h-30 w-90.5 resize-none gap-10 rounded-sm p-2.5 outline-none"
      />
    </div>
  );
}
