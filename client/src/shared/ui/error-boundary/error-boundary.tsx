import { Component, type ErrorInfo, type ReactNode } from "react";
import { Alert, Button, Flex } from "antd";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Flex vertical align="center" justify="center" style={{ padding: 48, minHeight: "50vh" }}>
          <Alert
            type="error"
            showIcon
            message="Что-то пошло не так"
            description={this.state.error?.message ?? "Произошла непредвиденная ошибка"}
            style={{ maxWidth: 600, width: "100%" }}
          />
          <Button type="primary" onClick={this.handleReset} style={{ marginTop: 16 }}>
            Попробовать снова
          </Button>
        </Flex>
      );
    }

    return this.props.children;
  }
}
