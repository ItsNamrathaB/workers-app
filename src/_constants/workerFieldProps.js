function workerFieldProps() {
  const data = [
    {
      name: "FirstName",
      type: "text",
      label: "First Name",
      required: true,
    },
    {
      name: "LastName",
      type: "text",
      label: "Last Name",
      required: true,
    },
    {
      name: "JobTitle",
      type: "text",
      label: "Job Title",
      required: true,
    },
    {
      name: "StreetAddress",
      type: "text",
      label: "Street Address",
      required: true,
    },
    {
      name: "City",
      type: "text",
      label: "City",
      required: true,
    },
    {
      name: "PostalCode",
      type: "text",
      label: "Postal Code",
      required: true,
    },
    {
      name: "MobileNumber",
      type: "number",
      label: "Mobile Number",
      required: true,
    },
    {
      name: "PhoneNumber",
      type: "number",
      label: "Phone Number",
      required: true,
    },
    {
      name: "DateHired",
      type: "date",
      label: "Date Hired",
      required: true,
    },

    {
      name: "Position",
      type: "text",
      label: "Position",
      required: true,
    },
    {
      name: "EmployeeNumber",
      type: "text",
      label: "Employee Number",
      required: true,
    },
    {
      name: "EmergencyContact1",
      type: "number",
      label: "Emergency Contact1",
      required: true,
    },
    {
      name: "EmergencyContact2",
      type: "number",
      label: "Emergency Contact2",
      required: false,
    },
    {
      name: "EmergencyNotes",
      type: "text",
      label: "Emergency Notes",
      required: false,
    },
  ];
  return data;
}
export default workerFieldProps;
