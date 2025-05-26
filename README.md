# VibeForm made by Human (no AI)\*

## Live Demo

[Live Demo](https://vibeform.vercel.app/)

Among all types of projects, the multi-step form has always been an exciting and challenging one for me. From day 1 of my journey in the programming career, it's always fascinating for me to build custom form/multi-step form, capture user input, apply different types of validation, and sanitization. This project is basically an output of that excitement, and will be used in my project. I'll keep working on this for more optimization, and releasing this as a complete plugin/package will be in my plan.

VibeForm is a modern, multi-step job application form built with React, TypeScript, Vite, and ShadCN UI components. It demonstrates advanced form management, validation, and user experience patterns for complex forms.

## Features

- **Multi-step form**: Organize large forms into logical steps for better UX.
- **React Hook Form**: Efficient form state management and validation.
- **Zod validation**: Schema-based, type-safe validation for all fields, including nested and array fields.
- **Dynamic fields**: Add or remove education entries with limits and minimum requirements.
- **Custom UI**: Built with ShadCN UI and Lucide icons for a clean, modern look.
- **TypeScript**: Full type safety across all components and schemas.
- **Reusable components**: Modular fields (TextField, SelectField, DateField, etc.) for easy extension.
- **Step validation**: Each step validates only its relevant fields.
- **Error display**: Inline error messages using ShadCN's FormMessage.

## Project Structure

```
src/
  components/
    form/
      FieldsArray.ts         // Dynamic array field logic
      VibeForm.tsx           // Main form wrapper
      fields/                // Reusable field components
      steps/                 // Stepper logic and UI
    ui/                      // ShadCN UI primitives
  context/                   // Step timeline context
  features/
    JobApplicationForm/      // Example form, schema, and step contents. This form is only for example purpose. The step mechanism and custom fields are the main features of this project.
      JobApplicationForm.tsx  // Main job application form component
      schema.ts               // Zod schema for validation
      steps/                  // Step components (e.g., PersonalDetails, EducationDetails)
  lib/
    utils.ts                 // Utility functions (e.g., age calculation)
  provider/
    StepProvider.tsx         // Step context provider
```

## Main Components

- **VibeForm**: Top-level form wrapper, handles schema, initial values, and submission.
- **StepTimeline**: Renders the stepper UI and manages navigation.
- **FieldsArray**: Handles dynamic arrays (e.g., education history) with min/max limits.
- **TextField, SelectField, DateField, RadioField, TextAreaField**: Reusable, type-safe form fields.
- **EducationDetails, PersonalDetails**: Step components for different sections of the form.

## Validation

- Uses [zod](https://zod.dev/) for schema validation.
- Supports nested objects and arrays (e.g., education history).
- Custom validation logic for age, GPA, and required fields.
- Step-specific validation using exported field lists (e.g., `firstStepFields`, `secondStepFields`).

## Usage

1. **Install dependencies**:
   ```bash
   npm install
   # or
   bun install
   ```
2. **Start the development server**:
   ```bash
   npm run dev
   # or
   bun run dev
   ```
3. **Open** [http://localhost:5173](http://localhost:5173) in your browser.

## Example

```tsx
import React from "react";
import { VibeForm } from "./components/form/VibeForm";
import { JobApplicationForm } from "./features/JobApplicationForm";
const App: React.FC = () => {
  return (
    <VibeForm
      schema={JobApplicationForm.schema}
      initialValues={JobApplicationForm.initialValues}
      onSubmit={JobApplicationForm.onSubmit}
    >
      <JobApplicationForm />
    </VibeForm>
  );
};
export default App;
```

## Getting Started

To get started with VibeForm, clone the repository and install the dependencies:

```bash
git clone https://github.com/ashikrnhq04/vibeform.git
cd vibeform
npm install
# or
bun install
```

## Customization

- **Add new steps**: Create a new step component and add it to `JobApplicationForm.tsx` inside the `<StepArea>`.
- **Add new fields**: Create a new field component in `fields/` and use it in your step component.
- **Validation**: Update `schema.ts` to add or change validation rules.

## Credits

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/)
- [zod](https://zod.dev/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Country API](https://countriesnow.space)

---

![screenshot1](/public/vibeform.png)

###### \* Except some type related help
