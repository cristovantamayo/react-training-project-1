import './App.css';
import { Component } from 'react';

class App extends Component {

  state = {
      counter: 0,
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

  timeoutUpdate = null;

  componentDidMount() {
   this.handleTimeout();
    console.log(`0`);
  }

  componentDidUpdate(prevProps, prevState) {
    clearTimeout(this.timeoutUpdate);
    this.handleTimeout();
    console.log(`1`);
  }
  

  handleTimeout = () => {
    const { posts, counter } = this.state;
    posts[0].name = `Title ${counter + 1} Updated`;

    this.timeoutUpdate = setTimeout(() => { 
      this.setState({posts, counter: counter + 1});
      
  }, 1000);
  }

  render() {
    const { posts, counter } = this.state;
    return (
      <div className="App">
        <h2>{counter}</h2>
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
