type PagingButtonsProps = {
  currentPage: number;
  totalPagesCount: number;
  listOfPages: number[];
  handlePage: (page: number) => void;
};

const PagingButtons = ({
  currentPage,
  listOfPages,
  handlePage,
}: PagingButtonsProps) => {
  return (
    listOfPages.length > 1 && (
      <div className="mx-2 flex gap-2 2xl:mx-5">
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
    )
  );
};

export default PagingButtons;
