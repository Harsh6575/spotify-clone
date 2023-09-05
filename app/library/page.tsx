/* eslint-disable @next/next/no-img-element */
import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import LibraryContent from "./components/LibraryContent";
export const revalidate = 0;

export default async function Library() {

  const songs = await getSongs();
  
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <div className="flex md:hidden flex-col ">
        <Header className="from-bg-neutral-900">
          <div className="mb-2 flex flex-col gap-y-6">
            <h1 className="text-white text-3xl font-semibold">
              Add Your Favourite Songs
            </h1>
          </div>
        </Header>
        <LibraryContent songs={songs} />
      </div>
      <div className="mt-2 mb-7 px-6 w-full h-full hidden md:flex">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="/images/bhaisahab.jpg"
            alt="bhaisahab"
            className="w-[400px]"
          />
        </div>
      </div>
    </div>
  );
}
