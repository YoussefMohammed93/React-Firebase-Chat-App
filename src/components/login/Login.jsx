import { useState } from "react";
import UserAvatar from "/avatar.png";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, DB } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

export default function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { Email, Password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, Email, Password);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { Username, Email, Password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, Email, Password);
      const ImgUrl = await upload(avatar.file);
      await setDoc(doc(DB, "users", res.user.uid), {
        Username,
        Email,
        avatar: ImgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(DB, "usersChats", res.user.uid), {
        chats: [],
      });

      toast.success("Account Created, You Can Login Now!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
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
          <button
            disabled={loading}
            className="login-btn w-full bg-[#5185fee7] text-white hover:bg-[#3d64bee7] transition-all duration-200 p-2 rounded-md"
          >
            {loading ? "Loading" : "Log In"}
          </button>
        </form>
      </div>
      <div className="separator h-full w-[1px] bg-[#dddddd35]"></div>
      <div className="login-item flex flex-col items-center gap-4">
        <h2 className="text-4xl text-white font-semibold">Create An Account</h2>
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center justify-center gap-4"
        >
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
          <button
            disabled={loading}
            className="login-btn w-full bg-[#5185fee7] text-white hover:bg-[#3d64bee7] transition-all duration-200 p-2 rounded-md"
          >
            {loading ? "Loading" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
