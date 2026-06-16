import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: undefined,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('App caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-950 text-stone-100 p-6">
          <div className="max-w-xl text-center rounded-3xl border border-stone-800 bg-stone-900/90 p-10 shadow-2xl">
            <h1 className="text-3xl font-bold text-orange-400 mb-4">حدث خطأ ما</h1>
            <p className="text-stone-300 mb-4">
              يبدو أن التطبيق تعرّض لمشكلة أثناء التشغيل. حاول تحديث الصفحة أو العودة لاحقاً.
            </p>
            <pre className="text-xs text-stone-400 bg-stone-950/80 rounded-xl p-4 overflow-x-auto max-h-40">
              {this.state.error?.message}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
