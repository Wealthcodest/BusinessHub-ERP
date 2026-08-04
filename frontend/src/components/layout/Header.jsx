import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white h-20 border-b flex items-center justify-between px-8">

      <div className="relative">

        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-80 rounded-lg border outline-none focus:ring-2 focus:ring-[#18566E]"
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell />

        <div className="flex items-center gap-3">

          <UserCircle2 size={36} />

          <div>

            <p className="font-semibold">
              Administrator
            </p>

            <p className="text-sm text-gray-500">
              Super Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}