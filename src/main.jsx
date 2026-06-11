import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store'
import App from './App'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          fontFamily: 'system-ui, sans-serif',
          color: '#e03131',
          background: '#fff5f5',
          border: '1px solid #ffc9c9',
          borderRadius: '8px',
          margin: '40px auto',
          maxWidth: '800px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0 }}>Something went wrong.</h2>
          <p style={{ fontWeight: 'bold' }}>{this.state.error?.toString()}</p>
          <pre style={{
            background: '#f8f9fa',
            padding: '16px',
            borderRadius: '4px',
            overflow: 'auto',
            border: '1px solid #e9ecef',
            color: '#343a40',
            fontSize: '14px',
            whiteSpace: 'pre-wrap'
          }}>
            {this.state.error?.stack}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#e03131',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

