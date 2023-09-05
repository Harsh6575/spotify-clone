"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AccountContent = () => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const USER = {
    name: "Harsh",
    email:"harsh.1904107146@gmail.com"
  };

  return (
    <div className="mb-7 px-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold">Your Accout Details</div>
        <button
          className="text-sm text-neutral-500 hover:text-neutral-600"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <div className="text-neutral-400">Name:</div>
          <div className="text-white">{USER.name}</div>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="text-neutral-400">Email:</div>
          <div className="text-white">{USER.email}</div>
        </div>
      </div>


    </div>
  );
};

export default AccountContent;
