

interface UserAvatarProps {
  firstName: string;
  lastName: string;
}

const UserAvatar = ({ firstName, lastName }: UserAvatarProps) => {
  return (
    <div className=" rounded-full  text-white flex items-center justify-center">
      <img
        src="/images/user.png"
        alt={firstName + " " + lastName}
        className="w-6 h-6 rounded-full"
        width={24}
        height={24}
      />
    </div>
  );
};

export default UserAvatar;
