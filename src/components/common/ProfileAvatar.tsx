import type { User } from "@/types/user";


interface ProfileAvatarProps {
  user: User;
}

const ProfileAvatar = ({ user }: ProfileAvatarProps) => {
  return (
    <div>
      {user.profile_picture ? (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={user.profile_picture}
            alt={`${user.first_name} ${user.last_name}`}
            className="object-cover w-full h-full"
          />

        </div>
      ) : (
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-500 text-sm">
            {user.first_name.charAt(0)}
            {user.last_name.charAt(0)}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
