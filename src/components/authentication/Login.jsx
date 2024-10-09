import { useState } from "react";
import { Toaster, toast } from 'sonner'

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      //dispatch action from hooks
    }
    alert("please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="text-[1vw] pt-[16vw] pb-[18vw] bg-white bg-opacity-10 text-white flex justify-center">
        <div>
            <p className="text-[2vw] font-bold">
                Welcome
            </p>

            <p className="mb-[0.5vw]">
                Login to your account to continue
            </p>

            <form onSubmit={handleSubmitEvent}>
                <div>                
                    <input
                    type="email"
                    id="user-email"
                    name="email"
                    placeholder="Email"                
                    onChange={handleInput}
                    className="rounded-[0.2vw] pl-[1vw] bg-transparent border-[0.1vw] h-[3vw] w-[20vw] mb-[0.7vw] border-white"
                    />
                    <div id="user-email" className="sr-only">
                    Please enter a valid username. It must contain at least 6 characters.
                    </div>
                </div>

                <div className="form_control">
                    <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"  
                    onChange={handleInput}
                    className="rounded-[0.2vw] pl-[1vw] bg-transparent border-[0.1vw] h-[3vw] w-[20vw] mb-[0.7vw] border-white"
                    />
                    <div id="user-password" className="sr-only">
                    your password should be more than 6 character
                    </div>
                </div>

                <div className="flex justify-center">
                    <button className="border py-[0.3vw] px-[1vw] rounded-[0.2vw] bg-white text-black font-semibold">Submit</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Login;