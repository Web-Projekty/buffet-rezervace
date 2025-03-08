type PagingButtonsProps = {
  currentPage: number;
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
      <div className="mx-5 flex gap-2">
        {listOfPages.map((index: number) => (
          <button
            key={index}
            onClick={() => handlePage(index)}
            className={`w-10 rounded-md border border-slate-900 px-3 py-2 ${
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
