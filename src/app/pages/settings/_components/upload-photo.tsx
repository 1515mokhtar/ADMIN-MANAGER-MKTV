import { UploadIcon } from "@/assets/icons";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import Image from "next/image";

export function UploadPhotoForm() {
  return (
    <ShowcaseSection title="Your Photo" className="!p-7">
      <form>
        <div className="mb-4 flex items-center gap-3">
          <Image
            src="/images/user/user-03.png"
            width={55}
            height={55}
            alt="User"
            className="size-14 rounded-full object-cover"
            quality={90}
          />

          <div>
            <span className="mb-1.5 font-medium text-dark dark:text-[#d7d7d6]">
              Edit your photo
            </span>
            <span className="flex gap-3">
              <button type="button" className="text-body-sm hover:text-[#ce392b] dark:text-[#d7d7d6] dark:hover:text-[#ce392b] transition-colors">
                Delete
              </button>
              <button className="text-body-sm hover:text-[#ce392b] dark:text-[#d7d7d6] dark:hover:text-[#ce392b] transition-colors">
                Update
              </button>
            </span>
          </div>
        </div>

        <div className="relative mb-5.5 block w-full rounded-xl border border-dashed border-gray-4 bg-gray-2 hover:border-[#ce392b] dark:border-[#ce392b] dark:bg-black dark:hover:border-[#770203]">
          <input
            type="file"
            name="profilePhoto"
            id="profilePhoto"
            accept="image/png, image/jpg, image/jpeg"
            hidden
          />

          <label
            htmlFor="profilePhoto"
            className="flex cursor-pointer flex-col items-center justify-center p-4 sm:py-7.5"
          >
            <div className="flex size-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-[#ce392b] dark:bg-[#0d0c0c]">
              <UploadIcon />
            </div>

            <p className="mt-2.5 text-body-sm font-medium">
              <span className="text-[#ce392b]">Click to upload</span> or drag and
              drop
            </p>

            <p className="mt-1 text-body-xs dark:text-[#d7d7d6]">
              SVG, PNG, JPG or GIF (max, 800 X 800px)
            </p>
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="flex justify-center rounded-lg border border-[#ce392b] px-6 py-[7px] font-medium text-[#ce392b] hover:bg-[#ce392b]/10 dark:border-[#ce392b] dark:text-[#d7d7d6] dark:hover:bg-[#ce392b]/20 transition-colors"
            type="button"
          >
            Cancel
          </button>
          <button
            className="flex items-center justify-center rounded-lg bg-[#ce392b] px-6 py-[7px] font-medium text-white hover:bg-[#770203] transition-colors"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
