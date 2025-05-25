import { calculateAge } from "@/lib/utils";
import { z } from "zod";

export const personalInfoSchema = z
  .object({
    firstName: z
      .string({ required_error: "First name is required" })
      .nonempty({ message: "First name can't be empty" }),
    lastName: z
      .string({ required_error: "Last name is required" })
      .nonempty({ message: "Last name can't be empty" }),
    fatherName: z
      .string({ required_error: "Father name is required" })
      .nonempty({ message: "Father's name can't be empty" }),
    motherName: z
      .string({ required_error: "Mother name is required" })
      .nonempty({ message: "Mother's name can't be empty" }),
    email: z
      .string({ required_error: "Email is required" })
      .nonempty({ message: "Email can't be empty" })
      .email({ message: "Email is invalid." })
      .trim(),
    phone: z.coerce
      .string({ required_error: "Contact no. is required" })
      .nonempty({ message: "Contact number can't be empty" })
      .regex(/^(?:\+88)?(01[3-9])(\d){8}$/, {
        message: "Provide a valid BD mobile number",
      }),
    dob: z.preprocess(
      (val) => {
        return val instanceof Date ? val : new Date(val as string);
      },
      z.date({ message: "Date can't be blank" }).refine(
        (dob) => {
          const age = calculateAge(dob);

          const today = new Date();

          const daysInMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
          ).getDate();

          //check eligibility by age between 18 and 32
          const isEligible =
            age.years >= 18 &&
            age.years <= 31 &&
            age.months < 12 &&
            age.days <= daysInMonth;

          return isEligible;
        },
        {
          message: "Age must be between 18 and 32",
        }
      )
    ),
    NID: z
      .string({ required_error: "NID no. is required" })
      .regex(/^(\d{10}|\d{17})$/, {
        message: "NID number must be in 10 or 17 digits format",
      }),

    gender: z
      .string({ required_error: "Gender is required" })
      .nonempty({ message: "A gender must be selected" }),

    customGender: z.string({ required_error: "Gender is required" }).optional(),
  })
  .refine(
    (data) => {
      if (data.gender === "other") {
        return data.customGender && data.customGender.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please specify your gender",
      path: ["customGender"],
    }
  );

export const addressSchema = z.object({
  address: z
    .string({ required_error: "Address is required" })
    .nonempty({ message: "Address can't be empty" }),
  city: z
    .string({ required_error: "City is required" })
    .nonempty({ message: "City can't be empty" }),
  division: z
    .string({ required_error: "Division is required" })
    .nonempty({ message: "Division can't be empty" }),
  country: z
    .string({ required_error: "Country is required" })
    .nonempty({ message: "Country can't be empty" }),
});

export const educationSchema = z
  .array(
    z.object({
      examination: z
        .string({ required_error: "Examination is required" })
        .nonempty({ message: "Examination can't be empty" }),
      group: z
        .string({ required_error: "Group is required" })
        .nonempty({ message: "Group can't be empty" }),
      passing_year: z
        .string({ required_error: "Examination year is required" })
        .nonempty({ message: "Year can't be empty" }),
      result: z
        .string({ required_error: "Grade is required" })
        .nonempty({ message: "Grade can't be empty" }),
      gpa_scale: z.preprocess(
        (val) => (val ? Number(val) : undefined),
        z
          .number({
            required_error: "GPA scale is required",
            message: "Select GPA scale",
          })
          .positive({ message: "Must be a positive number" })
          .optional()
      ),
      gpa_point: z.preprocess(
        (val) => (val ? Number(val) : undefined),
        z
          .number({
            required_error: "GPA is required",
            message: "Specify GPA",
          })
          .positive({ message: "Must be a positive number" })
          .optional()
      ),
    })

    // .transform((data) => {
    //   if (data.result !== "gpa") {
    //     return data;
    //   }

    //   return {
    //     ...data,
    //     gpa_point: data.gpa_point,
    //     gpa_scale: data.gpa_scale,
    //   };
    // })
    // .refine(
    //   (data) => {
    //     if (data.result === "gpa" && !data.gpa_point) {
    //       return false;
    //     }
    //     return true;
    //   },
    //   {
    //     message: "GPA point is required ",
    //     path: ["gpa_point"],
    //   }
    // )
    // .refine(
    //   (data) => {
    //     if (data.result === "gpa" && !data.gpa_scale) {
    //       return false;
    //     }
    //     return true;
    //   },
    //   {
    //     message: "Select GPA scale",
    //     path: ["gpa_scale"],
    //   }
    // )
    // .refine(
    //   (data) => {
    //     if (
    //       data.result === "gpa" &&
    //       Number(data.gpa_point) > Number(data.gpa_scale)
    //     ) {
    //       return false;
    //     }
    //     return true;
    //   },
    //   {
    //     message: "GPA point cannot exceed the GPA scale",
    //     path: ["gpa_point"],
    //   }
    // )
  )
  .min(1, { message: "Education information is required" })
  .default([]);

export type PersonalInfoType = z.infer<typeof personalInfoSchema>;
export type EducationType = z.infer<typeof educationSchema>;
export type AddressType = z.infer<typeof addressSchema>;
