import { HiCamera } from "react-icons/hi2";

function AvatarToggle({ ...props }) {
  return (
    <button
      className="bg-primary-300/35 hover:bg-primary-400/75 group flex cursor-pointer items-center justify-center rounded-full p-1 transition-colors"
      {...props}
    >
      <HiCamera className="text-primary-500/35 group-hover:text-primary-900/75 h-5 w-5 transition-colors" />
    </button>
  );
}

export default AvatarToggle;
