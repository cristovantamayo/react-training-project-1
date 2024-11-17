import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button'
import './styles.css'

class Home extends Component {

  state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 10
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage), 
      allPosts: postsAndPhotos 
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    this.setState({
      posts: [...posts, ...allPosts.slice(nextPage, nextPage + postsPerPage)],
      page: nextPage
    })
  }

  render() {
    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    return (
      <section className='container'>
       <Posts posts={posts} />
       <div className='button-container'>
          <Button 
            onClick={this.loadMorePosts} 
            text="Load more posts"
            disabled={noMorePosts}
          />
        </div>
     </section>
    );
  }
}

export default Home;
