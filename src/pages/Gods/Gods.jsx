import { useEffect, useState } from "react";
import { allGodsActives } from "../../services/apiCalls";

const Gods = () => {
  const [gods, setGods] = useState({});

  useEffect(() => {
    allGodsActives("gods/allGodsActive")
      .then((data) => {
        setGods(data.data.allGodsActive);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {gods.length > 0 ? (
        <div>
          {gods.map((god) => {
            return (
              <div key={god._id}>
                <p>{god.name}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div><p>Sin datos</p></div>
      )}
    </>
  );
};

export default Gods;
