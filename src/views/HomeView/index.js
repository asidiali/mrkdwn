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

  fetchMd = () => {
    const arr = this.state.url.split('.');
    if (arr[arr.length - 1] !== 'md') return alert('Only .MD files are allowed. Please check your file link and try again.');
    fetch(this.state.url, {
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
    return (
      <div style={styles.base}>
        {this.state.loaded ? (
          <div style={styles.body} className="markdown-body" dangerouslySetInnerHTML={{ __html: this.renderMd() }} />
        ) : (
          <div style={{
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}>
            <h1 style={{
              fontSize: '4em',
              textTransform: 'uppercase',
              letterSpacing: -5,
              margin: 'auto auto 20px',
            }}>MRKDWN</h1>

            <input
              type="text"
              placeholder="url to markdown file"
              value={this.state.url}
              onChange={e => this.setState({ url: e.target.value })}
              style={{
                padding: 15,
                fontSize: '1.1em',
                borderRadius: 5,
                border: '1px solid #eee',
                outline: 'none',
                width: 400,
              }}
            />

            <button
              onClick={this.fetchMd}
              style={{
                padding: '20px 40px',
                background: '#33cb52',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderRadius: 5,
                color: '#fff',
                margin: '20px auto auto',
                border: 0,
              }}
            >
              Load
            </button>
          </div>
        )}
      </div>
    );
  }
}
