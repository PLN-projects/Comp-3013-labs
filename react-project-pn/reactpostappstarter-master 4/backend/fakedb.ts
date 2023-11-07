import { Response } from "express";

export interface IDecodedUser {
  id: number;
}

const users = [
  { id: 1, email: "john123@gmail.com", password: "123" },
  { id: 2, email: "sandra123@gmail.com", password: "123" },
];

export const posts = [
  {
    id: 1,
    title: "Bird",
    category: "nature",
    content:
      "Belted Kingfishers are large-headed birds with a shaggy crest on the back of the head.",
    image:
      "https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_640.jpg",
    userId: 1,
  },
  {
    id: 2,
    title: "Beautiful BC",
    category: "nature",
    content: "BC is a province full of beauty at every corner.",
    image:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    userId: 2,
  },
];

export const addPost = (post: any) => {

  // if post.editing is a new value that's false or true depending on if the user came from the postDetails page or the create page
  if(post.editing == false){
    post.id = posts.length + 1;
    // userId is already inserted by the initialValues
    delete post.editing; // clean data so it doesn't get pushed into the array
    posts.push(post);
  }
  else {
    // use find function to check the array based on if the posts.id equals post.id 
    const found = posts.find((p) => p.id == post.id);
    if (found) {
      // Update the properties of the post
      found.title = post.title;
      found.category = post.category;
      found.content = post.content;
      found.image = post.image;
    }
    // probably not necessary, but I'm deleting the data that's no longer needed so it doesn't lead to any potential memory leaks
    delete post.editing;
    delete post.id;
    delete post.userId;
  }
};

export const verifyUser = (email: string, password: string) => {
  const user = users.find((user) => {
    return user.email === email && user.password === password;
  });
  if (!user) throw new Error("User not found");
  return user;
};

export const findUserById = (id: number) => {
  const user = users.find((user) => user.id === id);
  if (!user) throw new Error("User not found");
  return user;
};

export const parseToken = (authHeader: string | undefined, res: Response) => {
  if (!authHeader) {
    res.status(403).send("Header does not exist");
    return "";
  }
  return authHeader.split(" ")[1];
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
