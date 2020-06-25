import React, { Component } from "react";
import axios from "axios";
import "./Blog.css";

class Blog extends Component {
  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      const posts = response.data.slice(0, 4);
      const updatedPosts = posts.map((post) => {
        return {
          ...post,
        };
      });
      this.setState({ posts: updatedPosts, updated: true });
      console.log(posts);
    });
  }
  state = {
    posts: [],
    afterPost: [],
    updated: false,
    selected: false,
    changed: false,
    county: " ",
  };

  //https://restcountries.eu/rest/v2/name/{name}?fullText=true

  handleChange = () => {
    var e = document.getElementById("country");
    var result = e.options[e.selectedIndex].value;
    this.setState({ country: result });
    axios
      .get(`https://restcountries.eu/rest/v2/name/${result}?fullText=true`)
      .then((response) => {
        const posts = response.data.slice(0, 1);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
          };
        });
        this.setState({ afterPost: updatedPosts, changed: true });
        console.log(posts);
      });
  };
  render() {
    let count = 0;
    return (
      <div>
        <select
          name="country"
          id="country"
          onChange={this.handleChange}
          className="country"
        >
          {" "}
          <label className="Countries">Select Your Country:</label>
          {this.state.posts.map((post) => {
            return <option value={post.name}>{post.name}</option>;
          })}
        </select>
        {
          <div>
            {this.state.changed ? (
              <div>
                {this.state.afterPost.map((post) => {
                  return (
                    <div key={post.id}>
                      <label>TimeZone:</label>
                      <input type="text" value={post.timezones} />
                      <br />
                      <label>Currency :</label>
                      <input type="text" value={post.currencies[0].name} />
                      <br />
                      <label>Isocode :</label>
                      <input type="text" value={post.alpha3Code} />
                      <br />
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        }
      </div>
    );
  }
}

export default Blog;

// const posts = this.state.posts.map((post) => {
//     return (
//       <Link to={"/" + post.id} key={post.id}>
//         <Post
//           title={post.title}
//           author={post.author}
//           clicked={() => this.postSelectedHandler(post.id)}
//         />
//       </Link>
//     );
//   });

// return (
//     <form>
//     {this.state.posts.map((post) => {
//        return(
//       <label className="Countries">Select Your Country</label>
//       <br />
//       <select name="country" id="country">
//         <option value="---Select Your Country---t">
//           ---Select Your Country---
//         </option>
//         <option value="country-1">{this.state.posts["name"]}</option>
//         <option value="country-1">Female</option>
//         <option value="country-4">Others</option>
//         <option value="country-5">Others</option>
//         <option value="country-6">Others</option>
//       </select>
//        }
//        }
//     </form>
// const posts = this.state.posts.map((post) => {
//   return (
//     <div>
//       <label className="Countries">Select Your Country</label>
//       <br />
//       <select name="country" id="country">
//         <option value="---Select Your Country---t">
//           ---Select Your Country---
//         </option>
//         <option value="country-1">{post.name}</option>
//         <option value="country-1">Female</option>
//         <option value="country-4">Others</option>
//         <option value="country-5">Others</option>
//         <option value="country-6">Others</option>
//       </select>
//     </div>
//   );
// });
