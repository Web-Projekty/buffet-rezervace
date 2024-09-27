type PagingButtons = {
  currentPage: number;
  totalPagesCount: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
};

const PagingButtons = ({
  currentPage,
  totalPagesCount,
  handlePreviousPage,
  handleNextPage,
}: PagingButtons) => {
  return (
    totalPagesCount > 1 && (
      <div className="flex flex-row gap-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="cursor-pointer rounded-md border border-slate-900 bg-cyan-500 p-2 text-white hover:bg-cyan-700"
        >
          Předchozí
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPagesCount}
          className="cursor-pointer rounded-md border border-slate-900 bg-cyan-500 p-2 text-white hover:bg-cyan-700"
        >
          Další
        </button>
      </div>
    )
  );
};

export default PagingButtons;
