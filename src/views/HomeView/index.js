import 'whatwg-fetch';

import React from 'react';
import highlight from 'highlight.js';
import marked from 'marked';
import styles from './styles';

export default class HomeView extends React.Component {

  state = {
    url: '',
    md: '',
    loaded: false,
  }

  componentDidMount() {
    highlight.configure({ useBR: true });
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: code => highlight.highlightAuto(code).value,
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.location.query.url !== this.props.location.query.url) {
      this.setState({
        url: '',
        md: '',
        loaded: false,
      });
    }
  }

  validateMD = (url) => {
    const arr = url.split('.');
    if (arr[arr.length - 1] !== 'md') return false;
    return true;
  }

  fetchMd = (url) => {
    if (!this.validateMD(url)) return false;
    fetch(url, {
      method: 'GET',
      mode: 'CORS',
    })
      .then(res => res.text())
      .then((file) => {
        this.setState({
          loaded: true,
          md: file,
        })
      })
  }

  renderMd = () => {
    return marked(this.state.md);
  }

  render() {
    if (this.props.location.query.url) {
      this.fetchMd(this.props.location.query.url);
    }
    return (
      <div style={styles.base}>
        {this.state.loaded ? (
          <div style={styles.body} className="markdown-body" dangerouslySetInnerHTML={{ __html: this.renderMd() }} />
        ) : (
          <div style={styles.docWrapper}>
            <h1 style={styles.title}>MRKDWN</h1>

            <input
              type="text"
              placeholder="url to markdown file"
              value={this.state.url}
              onChange={e => this.setState({ url: e.target.value })}
              style={styles.input}
            />

            <button
              onClick={() => this.fetchMd(this.state.url)}
              style={styles.btn}
            >
              Load File
            </button>
          </div>
        )}
      </div>
    );
  }
}
