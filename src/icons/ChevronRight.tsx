const ChevronRight = (props: ChevronRightProps) => {
  return (
    <div className={props.className}>
      <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 5l7 7-7 7M5 5l7 7-7 7' />
      </svg>
    </div>
  );
};
export default ChevronRight;

interface ChevronRightProps {
  className: string;
}
