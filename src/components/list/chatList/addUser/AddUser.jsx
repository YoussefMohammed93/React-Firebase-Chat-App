import UserAvatar from "/avatar.png";

export default function AddUser() {
  return (
    <div className="add-user w-max h-max p-6 bg-[#111928ef] absolute inset-0 m-auto rounded-lg z-10">
      <form className="flex gap-4">
        <input
          type="text"
          placeholder="Username"
          name="Username"
          className="pr-10 pl-5 py-0 rounded-lg border-none outline-none"
        />
        <button className="bg-[#5185fee7] text-white hover:bg-[#3d64bee7] transition-all duration-200 p-2 rounded-md">
          Search
        </button>
      </form>
      <div className="user flex items-center justify-between mt-12">
        <div className="detail flex items-center gap-4">
          <img
            src={UserAvatar}
            alt="user-icon"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-white">Youssef Mohammed</span>
        </div>
        <button className="bg-[#5185fee7] text-white hover:bg-[#3d64bee7] transition-all duration-200 px-2 py-1 rounded-md">
          Add User
        </button>
      </div>
    </div>
  );
}
