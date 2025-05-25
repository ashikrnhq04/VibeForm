import { DateField } from "@/components/form/fields/DateField";
import RadioField from "@/components/form/fields/RadioField";
import SelectField from "@/components/form/fields/SelectField";
import TextAreaField from "@/components/form/fields/TextAreaField";
import { TextField } from "@/components/form/fields/TextField";
import {
  UserRound,
  UsersRound,
  UserCog,
  UserRoundPlus,
  Signal,
  Mail,
  SquareUserRound,
} from "lucide-react";

import { addressSchema, personalInfoSchema } from "./schema";
import { z } from "zod";
import { useFormContext } from "react-hook-form";
import { districts, divisions } from "./data";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const personalInfo = z.object({
  personalInfo: personalInfoSchema,
  present_address: addressSchema,
  permanent_address: addressSchema,
});

type PersonalInfoType = z.infer<typeof personalInfo>;

export default function PersonalDetails() {
  const { watch } = useFormContext<PersonalInfoType>();

  const gender = watch("personalInfo.gender");

  return (
    <>
      <div className='flex gap-4'>
        <TextField<PersonalInfoType>
          label='Name'
          placeholder='First Name'
          name='personalInfo.firstName'
          required
          icon={<UserRound size={18} />}
        />
        <TextField<PersonalInfoType>
          placeholder='Last Name'
          name='personalInfo.lastName'
          icon={<UsersRound size={18} />}
          required
        />
      </div>

      <TextField<PersonalInfoType>
        label="Father's Name"
        placeholder="Father's Name"
        name='personalInfo.fatherName'
        required
        icon={<UserCog size={18} />}
      />
      <TextField<PersonalInfoType>
        label="Mother's Name"
        placeholder="Mother's Name"
        name='personalInfo.motherName'
        required
        icon={<UserRoundPlus size={18} />}
      />

      <TextField<PersonalInfoType>
        label='Mobile No.'
        placeholder='Contact Number'
        name='personalInfo.phone'
        required
        icon={<Signal size={18} />}
      />
      <TextField<PersonalInfoType>
        label='Email'
        type='email'
        placeholder='Email Address'
        name='personalInfo.email'
        required
        icon={<Mail size={18} />}
      />
      <div className='flex gap-4 items-start'>
        <DateField<PersonalInfoType>
          label='Date of Birth'
          name='personalInfo.dob'
          placeholder='Pick a date'
          required
          description='Date of birth will be used to calculate age'
        />
        <TextField<PersonalInfoType>
          label='National ID'
          placeholder='NID number'
          name='personalInfo.NID'
          icon={<SquareUserRound size={18} />}
          required
        />
      </div>
      <div className='flex gap-4 flex-col'>
        <RadioField<PersonalInfoType>
          name='personalInfo.gender'
          label='Gender'
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          required
        />
        {gender === "other" && (
          <div>
            <TextField<PersonalInfoType>
              name='personalInfo.customGender'
              placeholder='Specify gender'
              required
            />
          </div>
        )}
      </div>
      <div className='flex gap-4 justify-between items-start'>
        <div className='w-full space-y-3'>
          <p className='text-left '>Present Address</p>

          <TextAreaField<PersonalInfoType>
            name='present_address.address'
            placeholder='Road, Area, Word, Zip Code'
            autoComplete='street-address'
            required
          />
          <SelectField<PersonalInfoType>
            options={districts}
            label='City'
            name='present_address.city'
            placeholder='Select City'
            required
          />
          <SelectField<PersonalInfoType>
            options={divisions}
            label='Division'
            name='present_address.division'
            placeholder='Select Division'
            required
          />
          <TextField<PersonalInfoType>
            type='text'
            label='Country'
            name='present_address.country'
            required
          />
        </div>
        <div className='w-0.5 h-70 bg-slate-200 self-center'></div>
        <div className='w-full space-y-3'>
          <p className='text-left '>Permanent Address</p>

          <TextAreaField<PersonalInfoType>
            name='permanent_address.address'
            placeholder='Road, Area, Word, Zip Code'
            autoComplete='street-address'
            required
          />

          <SelectField<PersonalInfoType>
            label='City'
            name='permanent_address.city'
            options={districts}
            placeholder='Select City'
            required
          />
          <SelectField<PersonalInfoType>
            label='Division'
            name='permanent_address.division'
            options={divisions}
            placeholder='Select Division'
            required
          />

          <TextField<PersonalInfoType>
            type='text'
            label='Country'
            name='permanent_address.country'
            required
            autoComplete='country-name'
          />
        </div>
      </div>
    </>
  );
}
