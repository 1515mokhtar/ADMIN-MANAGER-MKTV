import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/images/logo/logo.png"
        alt="MKTV Logo"
        width={180}
        height={60}
        className="h-16 w-auto"
      />
      <span className="text-xl font-bold text-primary dark:text-gray-400">ADMIN Manager</span>
    </div>
  );
}
