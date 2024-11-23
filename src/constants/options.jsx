export const NoOfTravellers = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo traveler on a mission",
    icon: "🧍",
    people: "1 person",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Partners in wanderlust",
    icon: "💑",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "A crew ready for memories",
    icon: "👨‍👩‍👧",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A pack of thrill-seekers",
    icon: "👫",
    people: "5 to 10 people",
  },
];

export const BudgetOptions = [
  {
    id: 1,
    title: "Budget-Friendly",
    desc: "Smart and savvy spending",
    icon: "🪙",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Comfort meets value",
    icon: "💰",
  },
  {
    id: 1,
    title: "Luxury",
    desc: "Sky is the limit!",
    icon: "💎",
  },
];

export const AI_PROMPT =
  "Generate Travel plan for Location: {location}, for {totalDays} Days for {noOfPeople} with a {budget} budget, Give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary ( at least 2 places to visit each day ) with placeName, Place Details, Place image Url, Geo Coordinates, ticket Pricing, rating, Time to travel each of the location and full schedule of each day about where to visit from which time to which time for {totalDays} days with each day plan with best time to visit. Also include restaurants for meals in between in the itinerary too in JSON format. Give all details as other places in itinerary for the restaurants too. dont include any other text in the response, just give the JSON.";
