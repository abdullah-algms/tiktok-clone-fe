//user
export const getSingleUser = async (username: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/user/single-user/${username}`, {
      cache: "no-store",
    });
    const data = await response.json();
    const user: User = data.data;
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/user/all-user/`, {
      cache: "no-store",
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
    const response = await fetch(`${process.env.API_URL}/api/user/follows/${currentUser}/${targetUser}`, {
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
    const response = await fetch(`${process.env.API_URL}/api/post/user-post/${username}`, {
      cache: "no-store",
    });
    const data = await response.json();
    const post: Post[] = data.data;
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/post/all-post`, {
      cache: "no-store",
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
    const response = await fetch(`${process.env.API_URL}/api/post/single-post/${postId}`);
    const data = await response.json();
    const post: Post = data.data;
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const addPost = async (body: BodyInit | null | undefined) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/post/add-post`, {
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
    const response = await fetch(`${process.env.API_URL}/api/post/likes/${postId}/${currentUser}`, {
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
    const response = await fetch(`${process.env.API_URL}/api/comments/all-comments/${postId}`);
    const data = await response.json();
    const comments: Comments[] = data.data;
    return comments;
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (currentUser: string, postId: string, commentText: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/comments/add-comment/${currentUser}/${postId}`, {
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
