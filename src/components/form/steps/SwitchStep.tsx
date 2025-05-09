import { Button } from "@/components/ui/button";

export default function SwitchStep({
  handlePrev,
  handleNext,
}: {
  handlePrev: () => void;
  handleNext: () => void;
}) {
  return (
    <div className='flex gap-2 justify-between items-center'>
      <Button
        variant='outline'
        className='cursor-pointer '
        onClick={handlePrev}>
        Prev
      </Button>
      <Button
        variant='outline'
        className='cursor-pointer '
        onClick={handleNext}>
        Next
      </Button>
    </div>
  );
}
