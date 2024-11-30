import { useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "./InputForm";

function AddMoney() {
  const userRef = useRef<HTMLInputElement>(null);
  const { userId } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate("/add-user");
    }
  }, [userId, navigate]);

  function onrampMoney() {
    const userInput = userRef.current?.value;
    console.log(userId, userInput);

    if (userInput && Number(userInput) > 0 && userId) {
      console.log(userId, userInput);
      fetch(`http://localhost:3000/onramp/inr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, amount: Number(userInput) }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            setError(data.error);
          } else {
            navigate("/events");
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
          setError("Failed to add money. Please try again later.");
        });
    } else {
      setError("Please enter a positive number");
    }
  }
  return (
    <div className="w-full flex-grow bg-[#99D7FA] px-6 flex items-center justify-center">
      <InputForm
        error={error}
        userRef={userRef}
        handleSubmit={onrampMoney}
        text="Add Balance"
        inputType="number"
      />
    </div>
  );
}

export default AddMoney;
