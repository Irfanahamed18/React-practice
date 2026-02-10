import React, { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((data) => data.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex justify-content-center">
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div className="my-3" key={post.id}>
              {/* User section */}
              <div className="d-flex align-items-center">
                <img
                  className="dp rounded-circle"
                  src={post.user.profile_pic}
                  alt="profile"
                />
                <h5>{post.user.username}</h5>
              </div>

              {/* Post image */}
              <img
                className="image"
                src={post.image}
                alt="post"
              />

              {/* Icons */}
              <div>
                <i className="bi bi-heart"></i>
                <i className="bi bi-chat"></i>
                <i className="bi bi-send"></i>
              </div>

              {/* Likes */}
              <div>
                <b>{post.likes} Likes</b>
              </div>

              {/* Caption */}
              <p>{post.caption}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading Posts</div>
      )}
    </div>
  );
}

export default Posts;
