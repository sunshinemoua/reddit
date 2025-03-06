import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {
  seed?: string;
  large?: boolean;
};

const Avatar = ({ seed, large }: Props) => {
  const { data: session } = useSession();
  return (
    <div
      className={`relative overflow-hidden rounded-full border-gray-300 bg-red-500 ${
        large ? "h-20 w-20" : "h-10 w-10"
      }`}
    >
      <Image
        layout="fill"
        alt="avatar"
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
          session?.user?.name || "placeholder"
        }`}
      />
    </div>
  );
};

export default Avatar;
