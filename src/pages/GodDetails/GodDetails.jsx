import { useSelector } from "react-redux";
import { godDetails } from "../godSlice";
import { useEffect, useState } from "react";
import { godsDetails } from "../../services/apiCalls";

const GodDetails = () => {
  const idGod = useSelector(godDetails);
  const [god, setGod] = useState();

  useEffect(() => {
    godsDetails("gods/godDetails/", idGod.id)
      .then((data) => {
        setGod(data.data.godDetails);
        console.log(data.data.godDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div>GodDetails</div>;
};

export default GodDetails;
