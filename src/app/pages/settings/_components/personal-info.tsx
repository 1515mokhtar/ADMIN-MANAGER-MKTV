import {
  CallIcon,
  EmailIcon,
  PencilSquareIcon,
  UserIcon,
} from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

export function PersonalInfoForm() {
  return (
    <ShowcaseSection title="Personal Information" className="!p-7">
      <form>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="fullName"
            label="Full Name"
            placeholder="David Jhon"
            defaultValue="David Jhon"
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
            inputClassName="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-black placeholder-gray-400 focus:border-[#ce392b] focus:ring-1 focus:ring-[#ce392b] dark:border-[#ce392b] dark:bg-black dark:text-[#d7d7d6] dark:placeholder-[#ce392b] dark:focus:border-[#ce392b] dark:focus:ring-[#ce392b] py-2.5"
          />

          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="phoneNumber"
            label="Phone Number"
            placeholder="+990 3343 7865"
            defaultValue={"+990 3343 7865"}
            icon={<CallIcon />}
            iconPosition="left"
            height="sm"
            inputClassName="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-black placeholder-gray-400 focus:border-[#ce392b] focus:ring-1 focus:ring-[#ce392b] dark:border-[#ce392b] dark:bg-black dark:text-[#d7d7d6] dark:placeholder-[#ce392b] dark:focus:border-[#ce392b] dark:focus:ring-[#ce392b] py-2.5"
          />
        </div>

        <InputGroup
          className="mb-5.5"
          type="email"
          name="email"
          label="Email Address"
          placeholder="devidjond45@gmail.com"
          defaultValue="devidjond45@gmail.com"
          icon={<EmailIcon />}
          iconPosition="left"
          height="sm"
          inputClassName="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-black placeholder-gray-400 focus:border-[#ce392b] focus:ring-1 focus:ring-[#ce392b] dark:border-[#ce392b] dark:bg-black dark:text-[#d7d7d6] dark:placeholder-[#ce392b] dark:focus:border-[#ce392b] dark:focus:ring-[#ce392b] py-2.5"
        />

        <InputGroup
          className="mb-5.5"
          type="text"
          name="username"
          label="Username"
          placeholder="devidjhon24"
          defaultValue="devidjhon24"
          icon={<UserIcon />}
          iconPosition="left"
          height="sm"
          inputClassName="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-black placeholder-gray-400 focus:border-[#ce392b] focus:ring-1 focus:ring-[#ce392b] dark:border-[#ce392b] dark:bg-black dark:text-[#d7d7d6] dark:placeholder-[#ce392b] dark:focus:border-[#ce392b] dark:focus:ring-[#ce392b] py-2.5"
        />

        <TextAreaGroup
          className="mb-5.5"
          label="BIO"
          placeholder="Write your bio here"
          icon={<PencilSquareIcon />}
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia turpis tortor, consequat efficitur mi congue a. Curabitur cursus, ipsum ut lobortis sodales, enim arcu pellentesque lectus ac suscipit diam sem a felis. Cras sapien ex, blandit eu dui et suscipit gravida nunc. Sed sed est quis dui."
          textareaClassName="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-black placeholder-gray-400 focus:border-[#ce392b] focus:ring-1 focus:ring-[#ce392b] dark:border-[#ce392b] dark:bg-black dark:text-[#d7d7d6] dark:placeholder-[#ce392b] dark:focus:border-[#ce392b] dark:focus:ring-[#ce392b] py-2.5"
        />

        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg border border-[#ce392b] px-6 py-[7px] font-medium text-[#ce392b] hover:bg-[#ce392b]/10 dark:border-[#ce392b] dark:text-[#d7d7d6] dark:hover:bg-[#ce392b]/20 transition-colors"
            type="button"
          >
            Cancel
          </button>

          <button
            className="rounded-lg bg-[#ce392b] px-6 py-[7px] font-medium text-white hover:bg-[#770203] transition-colors"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
