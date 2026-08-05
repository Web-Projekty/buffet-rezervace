import { Link } from "react-router";

const authors = [
  {
    name: "Ondřej Pták",
    github: "https://github.com/florixak",
  },
  {
    name: "Adam Vlček",
    github: "https://github.com/wlczak",
  },
  {
    name: "Jan Egermajer",
    github: "",
  },
];

const Footer = () => {
  return (
    <footer className="h-18 flex w-full flex-col items-center justify-center bg-slate-900 text-white md:h-16">
      <p className="text-center font-FiraSans">
        Vytvořeno v rámci maturitního projektu v roce 2024/25 žáky 4.H
      </p>
      <div className="flex flex-row gap-2">
        {authors.map((author, index) => {
          if (!author.github)
            return (
              <span className="cursor-default" key={author.name}>
                {author.name}
                {authors.length - 1 !== index && ","}
              </span>
            );
          return (
            <Link
              key={author.name}
              to={author.github}
              target="_blank"
              className={`hover:text-gray-200`}
            >
              {author.name}
              {authors.length - 1 !== index && ","}
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
