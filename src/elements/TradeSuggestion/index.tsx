import * as React from 'react';

const styles = require('./trade-suggestion.css');

interface TradeSuggestionProps {
  suggestion?: string;
}

class TradeSuggestion extends React.Component<TradeSuggestionProps> {

  public static defaultProps: TradeSuggestionProps = {
    suggestion: '',
  };

  render() {
    const { suggestion = '' } = this.props;

    return (
      <div className={styles[suggestion.toLowerCase()]}>
        {suggestion}
      </div>
    );
  }
}

export default TradeSuggestion;
