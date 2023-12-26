import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { userDetails } from "../userSlice";
import { useNavigate } from "react-router-dom";

const CreateListCounter = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();

  useEffect(() => {
    if (token.credentials == "") {
      navigate("/");
    }

    
  }, []);

  return <div>CreateListCounter</div>;
};

export default CreateListCounter;
