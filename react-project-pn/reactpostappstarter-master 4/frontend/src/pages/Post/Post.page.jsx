import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { useLoaderData, Await, defer } from "react-router-dom";
import { Loader } from '@mantine/core';
import React from 'react';

export const PostPage = () => {
  const posts = useLoaderData();

  return (
    <Container>
      <React.Suspense fallback={<Loader size="md" />}>
        <Await
          resolve={posts.res} // Use the promise for the posts data
          errorElement={<p>Error loading posts!</p>}
        >
          {(resolvedPosts) => (
            <SimpleGrid cols={3}>
              {resolvedPosts?.map((post) => (
                <ArticleCardImage key={post.title} {...post} />
              ))}
            </SimpleGrid>
          )}
        </Await>
      </React.Suspense>
    </Container>
  );
};

export const postsLoader = async () => {
  // according to the react router docs: This utility allows you to defer values returned from loaders by passing promises instead of resolved values. which to me means we pass the res at first and not res.data but that means the renderer must be changed
  const res = axios.get(`${DOMAIN}/api/posts`).then((res) => res.data); // return the promise then the data we get from it
  return defer({ res });
};
