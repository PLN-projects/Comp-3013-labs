import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate, useLocation } from "react-router-dom";
import useBoundStore from "../../store/Store";

function CreatePostPage() {
  const navigate = useNavigate();
  let userMatch = false;       

  let form = useForm({
    initialValues: {
      title: "",
      category: "",
      image: "",
      content: "",
      userId: useBoundStore((state) => state).user.id, // id of the current logged user
      editing: false, // boolean flag that indicates whether this post is being created or edited
    },
  });

  // useLocation allows me to capture initial values coming in from the Update route from the postDetailsPage. These Values are inserted into the initialValues in the Form which are all sent to addPost
  const initialValues = useLocation();
  
  // if the user came from the postDetailsPage by pressing update then initialValues.state is not null so form fields can be set
  if(initialValues.state != null) {
    form = useForm({
      initialValues: {
        title: initialValues.state.postValues.title,
        category: initialValues.state.postValues.category,
        image: initialValues.state.postValues.image,
        content: initialValues.state.postValues.content,
        id: initialValues.state.postValues.id, // Since the post is being updated add the post ID to the values
        editing: true, // since initialValues.state has data then initialValues.state.postValues.userId does, set editing to true
      },
    });
    
    // Check whether the logged in user is also the author -> this determines the create or update button will render
    const loggedUserID = useBoundStore((state) => state).user.id
    if(loggedUserID == initialValues.state.postValues.userId){
      userMatch = true;
    }
  }

  const handleSubmit = async (values) => {
    const res = await axios.post(`${DOMAIN}/api/posts`, values);
    if(values.editing == false) {
      if (res?.data.success) {
        navigate("/posts");
      }
    }
    else {
      if (res?.data.success) {
        navigate(`/posts/${values.id}`);
      }
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter a Title"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Category"
          placeholder="Enter a Category"
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          placeholder="Enter an Image"
          {...form.getInputProps("image")}
        />

        <TextInput
          label="Content"
          placeholder="Enter some content"
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          {userMatch == true 
          ? <Button type="submit">Update</Button>
            : <Button type="submit">Create</Button>}
        </Group>
      </form>
    </Box>
  );
}

export default CreatePostPage;
