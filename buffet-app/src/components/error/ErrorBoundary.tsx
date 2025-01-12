import { Component, ReactNode } from "react";

import ErrorComponent from "./ErrorComponent";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
  //   console.error("Uncaught error:", error, errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <ErrorComponent
          title="Omlouváme se, něco se pokazilo."
          subtitle="🛠️👷"
          onBack={() => setTimeout(() => window.location.reload(), 0)}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
