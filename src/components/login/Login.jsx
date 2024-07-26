import { useState } from "react";
import UserAvatar from "/avatar.png";
import { toast } from "react-toastify";

export default function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    toast.success("Hello");
  };

  return (
    <div className="login w-full h-full flex items-center gap-20">
      <div className="login-item flex flex-col items-center gap-4">
        <h2 className="text-4xl text-white font-semibold">Welcome Back,</h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center gap-4"
        >
          <input type="text" placeholder="Email" name="Email" />
          <input type="password" placeholder="Password" name="Password" />
          <button className="w-full bg-[#5185fee7] text-white hover:bg-[#3d64bee7] transition-all duration-200 p-2 rounded-md">
            Log In
          </button>
        </form>
      </div>
      <div className="separator h-full w-[1px] bg-[#dddddd35]"></div>
      <div className="login-item flex flex-col items-center gap-4">
        <h2 className="text-4xl text-white font-semibold">Create An Account</h2>
        <form className="flex flex-col items-center justify-center gap-4">
          <label
            htmlFor="file"
            className="w-full flex flex-row-reverse items-center justify-between cursor-pointer underline text-white"
          >
            Upload An Image
            <img
              src={avatar.url || UserAvatar}
              alt="image-upload"
              className="w-[70px] h-[70px] rounded-lg"
            />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="Username" />
          <input type="text" placeholder="Email" name="Email" />
          <input type="password" placeholder="Password" name="Password" />
          <button className="w-full bg-[#5185fee7] text-white hover:bg-[#3d64bee7] transition-all duration-200 p-2 rounded-md">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
