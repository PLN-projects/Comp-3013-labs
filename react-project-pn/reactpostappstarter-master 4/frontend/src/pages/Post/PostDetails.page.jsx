import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container, ScrollArea, Title, Text, Image, Group, Space, Box, SimpleGrid} from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { findUserById } from '../../../../backend/fakedb.ts';

function PostDetailsPage() {

  let singlePost = useLoaderData() // useloaderdata set's singlePost to the return value of postDetailsLoader I'm not sure why this function does this... but it works... I got the idea from the Post Page file.
  
  // set the logged in user data, I set the properties seperately so the password isn't captured
  const userData = {
    userEmail: useBoundStore((state) => state).user.email,
    userID: useBoundStore((state) => state).user.id,
  }

  // using the findUserById function from fakeDB file with the user ID from the post data to find the author of the post
  const author = findUserById(singlePost.userId); // The author object stores their password but I don't think there's a way around this

  return (
    <>
      <Container style={{padding: '20px', borderRadius: '10px'}} bg="var(--mantine-color-blue-light)">
        <SimpleGrid cols={{ base: 1, sm: 2}}>
            <Box style={{padding: '12px' , borderRadius: '10px'}} mx="auto" maw={350} bg="var(--mantine-color-blue-light)">
              <Title order={1}>{singlePost.title}</Title>
              <Space h="md" />
              <Text size="md">Post Author: {author.email.split("@")[0].trim()}</Text>
              <Space h="md" />
              <Text size="md" tt="capitalize">Category: {singlePost.category}</Text>
              <Space h="md" />
              <Title order={2}>Description</Title>
              <ScrollArea h={250}>
                {singlePost.content}
              </ScrollArea>
              {singlePost.userId == userData.userID ? 
                <>
                  <Button>
                    <Link to="/posts/create" state={{ postValues: singlePost }} >Update</Link>
                  </Button>
                  <Space h="md" />
                </> : <Space h="md" />}
              <Button>
                <Link to="/posts">Back to Posts</Link>
              </Button>
            </Box>
            <Image mx="auto" radius="md" src={singlePost.image} h="350" w="350" fit="fill"
              fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
          </SimpleGrid>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
    // do something with this -> ok
    const id = params.id;

    const response = await axios.get(`${DOMAIN}/api/posts/${id}`);
    let postData = response.data;
    // console.log(postData);

    return(postData);
};

export default PostDetailsPage;