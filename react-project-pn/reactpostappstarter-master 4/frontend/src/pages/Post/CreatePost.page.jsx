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
    },
  });

  // useLocation allows me to capturn initual values from the Update Page if that was used
  const initialValues = useLocation();
  
  if(initialValues.state != null) {
    form = useForm({
      initialValues: {
        title: initialValues.state.postValues.title,
        category: initialValues.state.postValues.category,
        image: initialValues.state.postValues.image,
        content: initialValues.state.postValues.content,
      },
    });

    const currentUserID = useBoundStore((state) => state).user.id

    if(currentUserID == initialValues.state.postValues.userId){
      userMatch = true;
    }
  }

  const handleSubmit = async (values) => {
    const res = await axios.post(`${DOMAIN}/api/posts`, values);
    if (res?.data.success) {
      navigate("/posts");
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
