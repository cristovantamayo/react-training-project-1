import './App.css';
import { Component } from 'react';

class App extends Component {

  state = {
      posts: [
        {
          id: 1,
          name: 'Title 1',
          body: 'Body 1',
        },
        {
          id: 2,
          name: 'Title 2',
          body: 'Body 2',
        },
        {
          id: 3,
          name: 'Title 3',
          body: 'Body 3'
        }

      ]
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App">
        {posts.map(post => (
          <div key={post.id}>
            <h1>{post.name}</h1>
            <p>{post.body}</p>
          </div>
        ))}
     </div>
    );
  }
}

export default App;
