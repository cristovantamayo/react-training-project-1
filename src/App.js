import './App.css';
import { Component } from 'react';

class App extends Component {

  state = {
      counter: 0,
      posts: []
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const postsResponse = 
      fetch('https://jsonplaceholder.typicode.com/posts');

    const phtosResponse = 
      fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = 
      await Promise.all([postsResponse, phtosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos  = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    });  

    this.setState({posts: postsAndPhotos});
    
  }

  componentDidUpdate() {
  }

  componentWillInmount() {
  }

  render() {
    const { posts, counter } = this.state;
    return (
      <section className='container'>
        <div className="posts">
          {posts.map(post => (
            <div className="post">
              <img src={post.cover} alt={post.title} />
              <div key={post.id} 
              className="post-content"> 
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
      </div>
     </section>
    );
  }
}

export default App;
