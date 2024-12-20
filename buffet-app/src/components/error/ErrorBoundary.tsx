import { Component, ErrorInfo, ReactNode } from "react";

import ErrorComponent from "./ErrorComponent";

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
        <ErrorComponent
          title="Omlouváme se, něco se pokazilo."
          subtitle="🛠️👷"
          onBack={() => setTimeout(() => window.location.reload(), 0)}
          className="h-screen"
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
