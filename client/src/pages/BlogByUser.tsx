import { useParams } from "react-router-dom";
const BlogByUser = () => {
  const params = useParams();
  return (
    <div>
      <h1>blog page with this id {params.id}</h1>
    </div>
  );
};

export default BlogByUser;
