export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "👧",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tandem",
    icon: "🥂",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "🏡",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A numch of thrill-seekes",
    icon: "😎",
    people: "5 to 10 people",
  },
];

export const SelectTripMode = [
  {
    id: 1,
    title: "Car",
    desc: "A classic road trip with freedom to stop anywhere",
    icon: "🚗",
  },
  {
    id: 2,
    title: "Motorcycle",
    desc: "For thrill-seekers who love the open road",
    icon: "🛵",
  },
  {
    id: 3,
    title: "Public Transit",
    desc: "Bus or train for an eco-friendly journey",
    icon: "🚍",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "🎟️",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "🎫",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💸",
  },
];
export const AI_PROMPT =
  "Generate road trip Planner for Location from : {locationfrom} to {locationto}, for {totaldays} Days for {traveler} with a {budget} budget through {vehicle},Give me a Hotel options list with, HotelName, Hotel address, Price, Hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totaldays} days with each days with each day plan with best time to visit in JSON format";
