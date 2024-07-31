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
import Spinner from "../Load/Spinner";

export default function SignUp() {
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { Username, Email, Password } = Object.fromEntries(formData);

    if (!Username || !Email || !Password) {
      toast.error("Please complete all fields");
      setLoading(false);
      return;
    }

    if (!avatar.file) {
      toast.error("Please upload your profile picture");
      setLoading(false);
      return;
    }

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

      await signOut(auth);
      toast.success("Account created successfully! Please log in.");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login w-full h-screen flex flex-col items-center md:flex-row md:justify-center gap-10 md:gap-40 py-10 px-5">
      <div className="separator hidden h-full w-[1px] bg-[#dddddd35]"></div>
      <div className="login-item flex flex-col items-center gap-4 md:gap-16 w-full md:max-w-md">
        <h2 className="text-4xl text-white font-semibold">Create An Account</h2>
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center justify-center gap-4 w-full md:max-w-md"
        >
          <label
            htmlFor="file"
            className="w-full flex flex-row-reverse items-center justify-between cursor-pointer underline text-white"
          >
            Upload An Image
            <img
              src={avatar.url || UserAvatar}
              alt="image-upload"
              className="w-[70px] h-[70px] rounded-lg object-contain"
            />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input
            type="text"
            placeholder="Username"
            name="Username"
            className="w-full md:max-w-md"
          />
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
            {loading ? "Loading" : "Sign Up"}
          </button>
          {loading && <Spinner />} {/* Show spinner when loading */}
          <Link to="/login" className="text-white underline text-lg">
            Already have an account? Log in now!
          </Link>
        </form>
      </div>
    </div>
  );
}
