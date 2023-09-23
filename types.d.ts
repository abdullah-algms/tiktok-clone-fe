interface User {
  profile: {
    name: string;
    image: string;
    bio: string;
  };
  _id: string;
  username: string;
  email: string;
  followers: [];
  total_followers: number;
  following: [];
  total_following: number;
  total_post: number;
  total_likes: number;
  createdAt: string;
  updatedAt: string;
  liked_post: [
    {
      _id: string;
      user_id: {
        _id: string;
        username: string;
      };
      thumbnail: string;
      total_view: number;
    }
  ];
}

interface Post {
  total_view: number;
  _id: string;
  user_id: {
    profile: {
      image: string;
    };
    _id: string;
    username: string;
  };
  caption: string;
  post: string;
  thumbnail: string;
  likes: [];
  total_likes: number;
  comments: [];
  total_comments: number;
  location: string;
  createdAt: string;
  post_public_id: string;
}

interface Comments {
  _id: string;
  text: string;
  post: string;
  user: {
    profile: {
      image: string;
    };
    username: string;
  };
  total_like: number;
  createdAt: string;
}
