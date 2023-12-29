import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";


const ListGodsAdmin = () => {
    const token = useSelector(userDetails);
  return (
    <div>ListGodsAdmin</div>
  )
}

export default ListGodsAdmin