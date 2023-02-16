export const dataUser = [
  {
    _id: "63701cc1f03239c72c00017f",
    firstName: "Joe",
    lastName: "Rogan",
    email: "joerogan@example.com",
    password: "John123",
    city: "Atlanta",
    state: "GA",
    country: "US",
    phoneNumber: "8346315874",
    payments: ["63701d74f0323986f3000158"],
    userType: "admin",
  },
  {
    _id: "63701cc1f03239c72c000180",
    firstName: "Alexa",
    lastName: "Jones",
    email: "alexajones@example.com",
    password: "Alexa123",
    city: "Charlotte",
    state: "NC",
    country: "US",
    phoneNumber: "9981906117",
    payments: ["63701d74f03239b7f7000027"],
    userType: "user",
  },
];
export const dataPayment = [
  {
    _id: "63701d74f0323986f3000158",
    userId: "63701cc1f03239c72c00017f",
    amount: "400.00",
    date: "01/21/2023",
    paymentType: "credit card",
  },
  {
    _id: "63701d74f03239b7f7000027",
    userId: "63701cc1f03239c72c000180",
    amount: "100.00",
    date: "01/22/2023",
    paymentType: "credit card",
  },
];
export const dataInvoice = [
  {
    _id: "63701d74f0323986c3000140",
    amount: "400",
    createdDate: "01/07/2023",
    dueDate: "01/30/2023",
    title: "Spring Dues",
    description: "Undergraduate Dues for Spring 2023",
    recurring: false,
    lateFee: "50",
    users: ["63701cc1f03239c72c00017f", "63701cc1f03239c72c000180"],
  },
];
