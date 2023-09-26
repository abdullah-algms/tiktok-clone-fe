//user
export const getSingleUser = async (username: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/users/${username}`);
    const data = await response.json();
    const user: User = data.data;
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/users/`, {
      next: {
        revalidate: 300,
      },
    });
    const data = await response.json();
    const user: User[] = data.data;
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async (currentUser: string, targetUser: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/users/follows/${currentUser}/${targetUser}`, {
      method: "PUT",
    });
    const data = await response.json();
    const user: User = data.data;
    return user;
  } catch (error) {
    console.log(error);
  }
};

//post
export const getUserPost = async (username: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/posts/user-post/${username}`);
    const data = await response.json();
    const post: Post[] = data.data;
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/posts/`, {
      next: {
        revalidate: 300,
      },
    });
    const data = await response.json();
    const post: Post[] = data.data;
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const getSinglePost = async (postId: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/posts/${postId}`);
    const data = await response.json();
    const post: Post = data.data;
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const addPost = async (body: BodyInit | null | undefined) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/posts/`, {
      method: "POST",
      body: body,
    });
    const data = await response.json();
    const post = data;
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (postId: string, currentUser: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/posts/likes/${postId}/${currentUser}`, {
      method: "PUT",
    });
    const data = await response.json();
    const post = data;
    return post;
  } catch (error) {
    console.log(error);
  }
};

//comment

export const getAllComments = async (postId: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/comments/${postId}`);
    const data = await response.json();
    const comments: Comments[] = data.data;
    return comments;
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (currentUser: string, postId: string, commentText: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/comments/${currentUser}/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: commentText,
      }),
    });
    const data = await response.json();
    const comment = data;
    return comment;
  } catch (error) {
    console.log(error);
  }
};
