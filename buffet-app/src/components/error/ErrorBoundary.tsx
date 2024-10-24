import { Component, ErrorInfo, ReactNode } from "react";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import Button from "../Button";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-5 overflow-x-hidden bg-slate-800 font-sans text-white">
          <img
            src={Logo}
            alt="Hamburger Logo"
            className={`animate-slowWiggle w-[248px] min-w-[248px] rounded-full bg-white p-1`}
          />
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-2xl">Omlouváme se, něco se pokazilo.</h1>
            <h2 className="text-xl">Pracujeme na opravě.</h2>
            {/* <span className="text-4xl">🛠️👷</span> */}
            <span className="text-4xl">👨‍💻</span>
          </div>
          <Link
            to="/"
            onClick={() => setTimeout(() => window.location.reload(), 0)}
          >
            <Button>Zpět na hlavní stránku</Button>
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
