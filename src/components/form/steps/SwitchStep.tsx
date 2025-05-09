export default function SwitchStep({
  handlePrev,
  handleNext,
}: {
  handlePrev: () => void;
  handleNext: () => void;
}) {
  return (
    <div className='controller flex gap-2 justify-between'>
      <button
        className='prev cursor-pointer p-2 border rounded-md'
        onClick={handlePrev}>
        Prev
      </button>
      <button
        className='next cursor-pointer p-2 border rounded-md'
        onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
