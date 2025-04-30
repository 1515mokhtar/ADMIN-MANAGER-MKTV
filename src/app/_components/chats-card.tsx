import { DotIcon } from "@/assets/icons";
import { formatMessageTime } from "@/lib/format-message-time";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { getChatsData } from "../fetch";

export async function ChatsCard() {
  const data = await getChatsData();

  return (
    <div className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <h2 className="mb-5.5 px-7.5 text-body-2xlg font-bold text-dark dark:text-white">
        Chats
      </h2>

      <ul>
        {data.map((chat, key) => (
          <li key={key}>
            <Link
              href="#"
              className="flex items-center gap-4.5 border-t border-stroke px-7.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
            >
              <div className="relative h-12.5 w-12.5 rounded-full">
                <Image
                  width={50}
                  height={50}
                  src={chat.avatar}
                  alt="User"
                  className="rounded-full"
                />
                <span
                  className={cn(
                    "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-dark",
                    chat.status === "online" ? "bg-success" : "bg-gray"
                  )}
                >
                  <DotIcon className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="flex flex-1 items-center justify-between">
                <div>
                  <h5 className="font-medium text-dark dark:text-white">
                    {chat.name}
                  </h5>
                  <p className="text-sm text-gray">{chat.message}</p>
                </div>
                <p className="text-sm text-gray">{formatMessageTime(chat.time)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 