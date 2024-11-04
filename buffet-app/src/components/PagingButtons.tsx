type PagingButtons = {
  currentPage: number;
  totalPagesCount: number;
  listOfPages: number[];
  handlePage: (page: number) => void;
};

const PagingButtons = ({
  currentPage,
  listOfPages,
  handlePage,
}: PagingButtons) => {
  return (
    listOfPages.length > 1 && (
      <div className="z-10 flex w-full flex-row items-center justify-center gap-10">
        <div className="flex gap-2">
          {listOfPages.map((index: number) => (
            <button
              key={index}
              onClick={() => handlePage(index)}
              className={`rounded-md border border-slate-900 px-3 py-2 ${
                currentPage === index
                  ? "cursor-default bg-cyan-700 text-white"
                  : "cursor-pointer bg-cyan-500 text-white hover:bg-cyan-700"
              }`}
            >
              {index}
            </button>
          ))}
        </div>
      </div>
    )
  );
};

export default PagingButtons;
