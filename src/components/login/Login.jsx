import { useState } from "react";
import UserAvatar from "/avatar.png";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, DB } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const navigate = useNavigate();
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
      toast.success("Logged in successfully!");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login w-full h-screen flex flex-col items-center md:flex-row md:justify-center gap-10 md:gap-40 py-10 px-5">
      <div className="login-item flex flex-col items-center gap-4 w-full md:max-w-md">
        <h2 className="text-4xl text-white font-semibold">Welcome Back,</h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center gap-4 md:gap-6 w-full  md:max-w-md"
        >
          <input
            type="text"
            placeholder="Email"
            name="Email"
            className="w-full md:max-w-md"
          />
          <input
            type="password"
            placeholder="Password"
            name="Password"
            className="w-full md:max-w-md"
          />
          <button
            disabled={loading}
            className="login-btn w-full bg-[#5185fee7] text-white hover:bg-[#3d64bee7] transition-all duration-200 p-2 rounded-md"
          >
            {loading ? "Loading" : "Log In"}
          </button>
          <Link to="/signup" className="text-white underline text-lg">
            Not have an account , sign up now!
          </Link>
        </form>
      </div>
    </div>
  );
}
