import { useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "./InputForm";
function AddUser() {
  const [error, setError] = useState("");
  const userRef = useRef<HTMLInputElement>(null);
  const { userId, setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate("/events");
    }
  }, [userId, navigate]);

  function handleUser() {
    const userInput = userRef.current?.value;
    if (userInput) {
      fetch(`http://localhost:3000/user/create/${userInput}`, {
        method: "POST",
      }).then((response) => {
        response.json().then((data) => {
          if (data.error) {
            if (data.error !== "User with this id already exists.") {
              setError(data.error);
            } else {
              setError("");
              setUserId(userInput);
              navigate("/events");
            }
          } else {
            setError("");
            setUserId(userInput);
            navigate("/events");
          }
        });
      });
    }
  }
  return (
    <div className="w-full flex-grow bg-[#99D7FA] px-6 flex items-center justify-center">
      <InputForm
        error={error}
        userRef={userRef}
        handleSubmit={handleUser}
        text="Add User"
        inputType="text"
      />
    </div>
  );
}

export default AddUser;
