import { useSelector } from "react-redux";
import { godDetails } from "../godSlice";
import { useEffect } from "react";

const GodDetails = () => {
  const idGod = useSelector(godDetails);

  useEffect(() => {
    console.log(idGod);
  }, []);

  return <div>GodDetails</div>;
};

export default GodDetails;
