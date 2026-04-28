import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryState = {
  hasError: boolean;
  statusCode?: number;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    statusCode: undefined,
  };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof (error as { status?: unknown }).status === "number"
        ? (error as { status: number }).status
        : undefined;

    return {
      hasError: true,
      statusCode,
    };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {}

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="container" style={{ padding: "48px 0" }}>
        <h2>Произошла ошибка</h2>
        <p>Код ошибки: {this.state.statusCode ?? "unknown"}</p>
      </div>
    );
  }
}

export default ErrorBoundary;
