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
    memberType: "admin",
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
    memberType: "user",
  },
];
export const dataPayment = [
  {
    _id: "63701d74f0323986f3000158",
    userId: "63701cc1f03239c72c00017f",
    amount: "341.02",
  },
  {
    _id: "63701d74f03239b7f7000027",
    userId: "63701cc1f03239c72c000180",
    amount: "79.65",
  },
];
