// src/utils/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      const Fallback =
        this.props.fallback || (() => <p>Something went wrong.</p>);
      return <Fallback />;
    }
    return this.props.children;
  }
}
