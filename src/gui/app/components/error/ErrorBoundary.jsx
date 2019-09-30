import React, { Component } from 'react';
import { Title } from 'gui/app/components/label';


export class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
      errorInfo: '',
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    const { children } = this.props;
    const { error, errorInfo, hasError } = this.state;
    const summary = error.name;
    const details = errorInfo.componentStack;
    if (process.env.NODE_ENV === 'development' && hasError) {
      return (
        <div>
          <Title>
            system error
          </Title>
          { summary }
          { details.split('\n').map(line => (
            <div key={ line }>
              { line }
            </div>
          ))}
        </div>
      );
    }
    return children;
  }
}
