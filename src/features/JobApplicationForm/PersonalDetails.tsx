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
import { getCountries } from "./data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useCities } from "@/hooks/useCities";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const personalInfo = z.object({
  personalInfo: personalInfoSchema,
  present_address: addressSchema,
  permanent_address: addressSchema,
});

type PersonalInfoType = z.infer<typeof personalInfo>;

export default function PersonalDetails() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<PersonalInfoType>();

  const [countries, setCountries] = useState<{ text: string; value: string }[]>(
    []
  );

  const [presentCountry, setPresentCountry] = useState<string | null>(null);

  const [permanentCountry, setPermanentCountry] = useState<string | null>(null);

  // Keep tracking of gender if its custom
  const gender = watch("personalInfo.gender");

  const presentCities: { text: string; value: string }[] =
    useCities(presentCountry) ?? [];

  const permanentCities: { text: string; value: string }[] =
    useCities(permanentCountry) ?? [];

  useEffect(() => {
    getCountries(setCountries);
  }, []);

  console.log(
    "Present length",
    permanentCities.length,
    "Permanent length",
    permanentCities.length
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex gap-4'>
          <TextField<PersonalInfoType>
            label='Name'
            placeholder='First Name'
            name='personalInfo.firstName'
            required
            icon={<UserRound size={18} />}
            hasError={!!errors.personalInfo?.firstName}
          />
          <TextField<PersonalInfoType>
            placeholder='Last Name'
            name='personalInfo.lastName'
            icon={<UsersRound size={18} />}
            required
            hasError={!!errors.personalInfo?.lastName}
          />
        </div>

        <TextField<PersonalInfoType>
          label="Father's Name"
          placeholder="Father's Name"
          name='personalInfo.fatherName'
          required
          icon={<UserCog size={18} />}
          hasError={!!errors.personalInfo?.fatherName}
        />
        <TextField<PersonalInfoType>
          label="Mother's Name"
          placeholder="Mother's Name"
          name='personalInfo.motherName'
          required
          icon={<UserRoundPlus size={18} />}
          hasError={!!errors.personalInfo?.motherName}
        />

        <TextField<PersonalInfoType>
          label='Mobile No.'
          placeholder='Contact Number'
          name='personalInfo.phone'
          required
          icon={<Signal size={18} />}
          hasError={!!errors.personalInfo?.phone}
        />
        <TextField<PersonalInfoType>
          label='Email'
          type='email'
          placeholder='Email Address'
          name='personalInfo.email'
          required
          icon={<Mail size={18} />}
          hasError={!!errors.personalInfo?.email}
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
            hasError={!!errors.personalInfo?.NID}
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
                hasError={!!errors.personalInfo?.customGender}
              />
            </div>
          )}
        </div>
        <div className='flex gap-4 justify-between items-start'>
          <div className='w-full space-y-3'>
            <p className='text-left font-bold'>
              Present Address <span className='text-red-500'>*</span>
            </p>
            <SelectField<PersonalInfoType>
              options={countries}
              label='Country'
              name='present_address.country'
              placeholder='Select Country'
              onChange={(value) => {
                setPresentCountry(value);
                setValue("present_address.city", ""); // Reset city when country changes
              }}
              required
            />
            <TextAreaField<PersonalInfoType>
              name='present_address.address'
              placeholder='Road, Area, Word, Zip Code'
              autoComplete='street-address'
              label='Address'
              required
            />
            <SelectField<PersonalInfoType>
              options={presentCities}
              label='City'
              name='present_address.city'
              placeholder={
                presentCountry === null
                  ? "Select a country first"
                  : !presentCities.length
                  ? "Loading cities..."
                  : "Select City"
              }
              required
            />
          </div>
          <div className='w-0.5 h-70 bg-slate-200 self-center'></div>
          <div className='w-full space-y-3'>
            <p className='text-left font-bold'>
              Permanent Address <span className='text-red-500'>*</span>
            </p>

            <SelectField<PersonalInfoType>
              options={countries}
              label='Country'
              name='permanent_address.country'
              placeholder='Select Country'
              onChange={(value) => {
                setPermanentCountry(value);
                setValue("permanent_address.city", "");
              }}
              required
            />
            <TextAreaField<PersonalInfoType>
              name='permanent_address.address'
              placeholder='Road, Area, Word, Zip Code'
              autoComplete='street-address'
              label='Address'
              required
            />

            <SelectField<PersonalInfoType>
              label='City'
              name='permanent_address.city'
              options={permanentCities}
              placeholder={
                permanentCountry === null
                  ? "Select a country first"
                  : !permanentCities.length
                  ? "Loading cities..."
                  : "Select City"
              }
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
