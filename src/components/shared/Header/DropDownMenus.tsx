"use client";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import SignOut from "../SignOut";
import Image from "next/image";
import { Bell, Calendar, CircleDollarSign, CircleUser } from "lucide-react";
import Link from "next/link";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import { JWTDecode } from "@/utils/jwt";

const DropDownMenus = ({ setActive }: { setActive: any }) => {
  const { name, email } = useAppSelector(useCurrentUser);
  const { data: profileData } = useProfileQuery("");
  const { decoded } = JWTDecode();

  return (
    <div
      onClick={() => setActive(false)}
      className="border bg-white rounded-[4px] z-40 min-h-60 w-[320px]"
    >
      <div>
        <div className="p-3 bg-gradient-to-r from-primary/10 to-[#f8f8f8] w-full flex items-center gap-1">
          <Image
            className="h-12 rounded-full w-12 object-cover"
            height={20}
            width={20}
            alt=""
            src={
              profileData?.data?.profileImage ||
              "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png"
            }
          ></Image>
          <div>
            <h1 className="font-semibold">{name}</h1>
            <h1 className="text-sm text-gray-600">{email}</h1>
          </div>
        </div>
        <div className="p-2 border-b">
          <Link
            href="/my-profile/manage-profile"
            className="flex gap-2 items-center hover:bg-primary/10 py-2 px-4 rounded-[6px]"
          >
            <CircleUser size={20} className="text-secondary "></CircleUser>
            <h1 className="font-medium">My Account</h1>
          </Link>

          <Link
            href="/my-profile/manage-bookings"
            className="flex gap-2 items-center hover:bg-primary/10 py-2 px-4 rounded-[6px]"
          >
            <Bell size={20} className="text-secondary "></Bell>
            <h1 className="font-medium">Booking History</h1>
          </Link>
          {decoded?.role == "Lawyer" && (
            <Link
              href="/my-profile/manage-earnings"
              className="flex gap-2 items-center hover:bg-primary/10 py-2 px-4 rounded-[6px]"
            >
              <CircleDollarSign
                size={20}
                className="text-secondary "
              ></CircleDollarSign>
              <h1 className="font-medium">Earnings</h1>
            </Link>
          )}
          {decoded?.role == "Lawyer" && (
            <Link
              href="/my-profile/availability"
              className="flex gap-2 items-center hover:bg-primary/10 py-2 px-4 rounded-[6px]"
            >
              <Calendar size={20} className="text-secondary "></Calendar>
              <h1 className="font-medium">Availabilty</h1>
            </Link>
          )}
        </div>
      </div>

      <div onClick={() => setActive(false)}>
        <SignOut></SignOut>
      </div>
    </div>
  );
};

export default DropDownMenus;
