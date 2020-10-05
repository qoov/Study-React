import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Post from "./components/post/Post";
import ErrorMessage from "./components/error/Error";
import Nav from "./components/nav/navbar";
import Loader from "./components/Loader";
import * as API from "./shared/http";
import Ad from "./components/ad/Ad";
import Navbar from "./components/nav/navbar";
import Welcome from "./components/welcome/Welcome";
import parseLinkHeader from "parse-link-header";
import { orderBy } from "lodash";

/**
 * The app component serves as a root for the project and renders either children,
 * the error state, or a loading state
 * @method App
 * @module letters/components
 */
class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      posts: [],
      endpoint: `${
        process.env.ENDPOINT
      }/posts?_page=1&_sort=date&_order=DESC&_embed=comments&_expand=user&_embed=likes`,
    };
    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    API.fetchPosts(this.state.endpoint)
      .then((response) => {
        return response.json().then((posts) => {
          console.log("get posts", posts);
          const links = parseLinkHeader(response.headers.get("Link"));
          this.setState(() => ({
            posts: orderBy(this.state.posts.concat(posts), "date", "desc"),
            endpoint: links.next.url,
          }));
        });
      })
      .catch((error) => {
        this.setState(() => ({ error }));
      });
  }

  render() {
    if (this.props.error) {
      return (
        <div className="app">
          <ErrorMessage error={this.props.error} />
        </div>
      );
    }

    return (
      <div className="app">
        <Navbar />
        {this.props.loading ? (
          <div className="loading">
            <Loader />
          </div>
        ) : (
          <div className="home">
            <Welcome />
            <div>
              {this.state.posts.length &&
                this.state.posts.map(({ id }) => (
                  <Post id={id} key={id} user={this.props.user} />
                ))}
              <button className="block">Load more posts</button>
            </div>
            <div>
              <Ad
                url="https://ifelse.io/book"
                imageUrl="/static/assets/ads/ria.png"
              />
              <Ad
                url="https://ifelse.io/book"
                imageUrl="/static/assets/ads/orly.jpg"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
