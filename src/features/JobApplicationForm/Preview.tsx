import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import React from "react";
import { useFormContext } from "react-hook-form";
import CheckboxField from "@/components/form/fields/CheckboxField";

type Education = {
  examination: string;
  group: string;
  passing_year: string;
  result: string;
  gpa_point?: string;
  gpa_scale?: number;
};

type Experience = {
  company: string;
  jobTitle: string;
  startingDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  jobDescription?: string;
};

export default function SubmissionPreview() {
  const {
    personalInfo,
    present_address,
    permanent_address,
    education,
    experience,
  } = useFormContext().getValues();

  // Utility for cell classes
  const leftCell = "text-left font-bold border-1 w-[40%] bg-gray-50";
  const rightCell = "border-1 text-left w-[60%]";

  return (
    <div className='space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>Submission Preview</CardTitle>
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* Personal Info */}
          <h2 className='text-lg font-bold mb-2 text-left p-2 bg-green-100'>
            Personal Information
          </h2>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={leftCell}>First Name</TableCell>
                <TableCell className={rightCell}>
                  {personalInfo.firstName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={leftCell}>Last Name</TableCell>
                <TableCell className={rightCell}>
                  {personalInfo.lastName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={leftCell}>Father's Name</TableCell>
                <TableCell className={rightCell}>
                  {personalInfo.fatherName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={leftCell}>Mother's Name</TableCell>
                <TableCell className={rightCell}>
                  {personalInfo.motherName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={leftCell}>Email</TableCell>
                <TableCell className={rightCell}>
                  {personalInfo.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={leftCell}>Date of Birth</TableCell>
                <TableCell className={rightCell}>
                  {personalInfo.dob
                    ? format(new Date(personalInfo.dob), "PPP")
                    : ""}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={leftCell}>Phone</TableCell>
                <TableCell className={rightCell}>
                  {personalInfo.phone}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={leftCell}>NID</TableCell>
                <TableCell className={rightCell}>{personalInfo.NID}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={leftCell}>Gender</TableCell>
                <TableCell className={rightCell}>
                  {personalInfo.gender === "other"
                    ? personalInfo.customGender
                    : personalInfo.gender}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Present Address */}
          <h2 className='text-lg font-bold mb-2 text-left p-2 bg-green-100'>
            Present Address
          </h2>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={leftCell}>Address</TableCell>
                <TableCell className={rightCell}>
                  {present_address.address}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={leftCell}>City</TableCell>
                <TableCell className={rightCell}>
                  {present_address.city}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={leftCell}>Division</TableCell>
                <TableCell className={rightCell}>
                  {present_address.division}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={leftCell}>Country</TableCell>
                <TableCell className={rightCell}>
                  {present_address.country}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Permanent Address */}
          <h2 className='text-lg font-bold mb-2 text-left p-2 bg-green-100'>
            Permanent Address
          </h2>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={leftCell}>Address</TableCell>
                <TableCell className={rightCell}>
                  {permanent_address.address}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={leftCell}>City</TableCell>
                <TableCell className={rightCell}>
                  {permanent_address.city}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={leftCell}>Division</TableCell>
                <TableCell className={rightCell}>
                  {permanent_address.division}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={leftCell}>Country</TableCell>
                <TableCell className={rightCell}>
                  {permanent_address.country}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Education */}
          <h2 className='text-lg font-bold mb-2 text-left p-2 bg-green-100'>
            Education
          </h2>
          <Table>
            <TableBody>
              {education.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className='text-center'>
                    No education information provided.
                  </TableCell>
                </TableRow>
              ) : (
                education.map((edu: Education, idx: number) => (
                  <React.Fragment key={idx}>
                    <TableRow>
                      <TableCell className={leftCell}>Examination</TableCell>
                      <TableCell className={rightCell}>
                        {edu.examination}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={leftCell}>Group</TableCell>
                      <TableCell className={rightCell}>{edu.group}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={leftCell}>Passing Year</TableCell>
                      <TableCell className={rightCell}>
                        {edu.passing_year}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={leftCell}>Result</TableCell>
                      <TableCell className={rightCell}>{edu.result}</TableCell>
                    </TableRow>
                    {edu.result === "gpa" && (
                      <TableRow>
                        <TableCell className={leftCell}>GPA Point</TableCell>
                        <TableCell className={rightCell}>
                          {edu.gpa_point ?? ""}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>

          {/* Experience */}
          <h2 className='text-lg font-bold mb-2 text-left p-2 bg-green-100'>
            Experience
          </h2>
          <Table>
            <TableBody>
              {experience.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className='text-center'>
                    No experience information provided.
                  </TableCell>
                </TableRow>
              ) : (
                experience.map((exp: Experience, idx: number) => (
                  <React.Fragment key={idx}>
                    <TableRow>
                      <TableCell className={leftCell}>Company</TableCell>
                      <TableCell className={rightCell}>{exp.company}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={leftCell}>Job Title</TableCell>
                      <TableCell className={rightCell}>
                        {exp.jobTitle}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={leftCell}>Start Date</TableCell>
                      <TableCell className={rightCell}>
                        {exp.startingDate
                          ? format(new Date(exp.startingDate), "PPP")
                          : ""}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={leftCell}>End Date</TableCell>
                      <TableCell className={rightCell}>
                        {exp.endDate
                          ? format(new Date(exp.endDate), "PPP")
                          : ""}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={leftCell}>
                        Currently Working
                      </TableCell>
                      <TableCell className={rightCell}>
                        {exp.currentlyWorking ? "Yes" : "No"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={leftCell}>Description</TableCell>
                      <TableCell
                        className={`${rightCell} whitespace-break-spaces`}
                      >
                        {exp.jobDescription ?? ""}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
          <CheckboxField
            name='consent'
            label='All the information is correct. I agree to submit the form.'
          />
        </CardContent>
      </Card>
    </div>
  );
}
