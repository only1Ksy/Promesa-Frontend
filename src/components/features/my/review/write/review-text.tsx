interface ReviewTextAreaProps {
  content: string;
  setContent: (value: string) => void;
}

export default function ReviewText({ content, setContent }: ReviewTextAreaProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-body-02 flex gap-0.5 font-medium">
        <span className="text-black">상세 리뷰를 작성해주세요.</span>
        <span className="text-grey-5">(필수)</span>
      </div>
      <textarea
        placeholder="어떤 점이 좋았나요? 10자 이상 작성해주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="bg-green text-body-02 font-regular flex h-34 w-90.5 origin-left scale-[0.875] resize-none gap-10 rounded-sm p-3 text-base outline-none"
        style={{
          width: '114.29%',
        }}
      />
    </div>
  );
}
