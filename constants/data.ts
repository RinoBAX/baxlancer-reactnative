import icons from "./icons";
import images from "./images";

export const cards = [
  {
    title: "Card 1",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    category: "house",
    image: images.newYork,
  },
  {
    title: "Card 2",
    location: "Location 2",
    price: "$200",
    rating: 3,
    category: "house",
    image: images.japan,
  },
  {
    title: "Card 3",
    location: "Location 3",
    price: "$300",
    rating: 2,
    category: "flat",
    image: images.newYork,
  },
  {
    title: "Card 4",
    location: "Location 4",
    price: "$400",
    rating: 5,
    category: "villa",
    image: images.japan,
  },
];

export const featuredCards = [
  {
    title: "Featured 1",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    image: images.newYork,
    category: "house",
  },
  {
    title: "Featured 2",
    location: "Location 2",
    price: "$200",
    rating: 3,
    image: images.japan,
    category: "flat",
  },
];

export const categories = [
  { title: "All", category: "All" },
  { title: "Houses", category: "House" },
  { title: "Condos", category: "Condos" },
  { title: "Duplexes", category: "Duplexes" },
  { title: "Studios", category: "Studios" },
  { title: "Villas", category: "Villa" },
  { title: "Apartments", category: "Apartments" },
  { title: "Townhomes", category: "Townhomes" },
  { title: "Others", category: "Others" },
];

export const projects = [
  {
    $id: "1",
    title: "Modern Apartment",
    location: "Jakarta, Indonesia",
    image: images.newYork,
    price: "$150,000",
    category: "Apartment",
    isFeatured: true,
  },
  {
    $id: "2",
    title: "Cozy Studio",
    location: "Bandung, Indonesia",
    image: images.japan,
    price: "$90,000",
    category: "Studio",
  },
  {
    $id: "3",
    title: "Luxury Villa",
    location: "Bali, Indonesia",
    image: images.newYork,
    price: "$750,000",
    category: "Villa",
    isFeatured: true,
  },
  {
    $id: "4",
    title: "Minimalist House",
    location: "Surabaya, Indonesia",
    image: images.japan,
    price: "$320,000",
    category: "House",
  },
];

export const settings = [
  {
    title: "My Bookings",
    icon: icons.calendar,
  },
  {
    title: "Payments",
    icon: icons.wallet,
  },
  {
    title: "Profile",
    icon: icons.person,
  },
  {
    title: "Notifications",
    icon: icons.bell,
  },
  {
    title: "Security",
    icon: icons.shield,
  },
  {
    title: "Language",
    icon: icons.language,
  },
  {
    title: "Help Center",
    icon: icons.info,
  },
  {
    title: "Invite Friends",
    icon: icons.people,
  },
];

export const facilities = [
  {
    title: "Laundry",
    icon: icons.laundry,
  },
  {
    title: "Car Parking",
    icon: icons.carPark,
  },
  {
    title: "Sports Center",
    icon: icons.run,
  },
  {
    title: "Cutlery",
    icon: icons.cutlery,
  },
  {
    title: "Gym",
    icon: icons.dumbell,
  },
  {
    title: "Swimming pool",
    icon: icons.swim,
  },
  {
    title: "Wifi",
    icon: icons.wifi,
  },
  {
    title: "Pet Center",
    icon: icons.dog,
  },
];

export const gallery = [
  {
    id: 1,
    image: images.newYork,
  },
  {
    id: 2,
    image: images.japan,
  },
  {
    id: 3,
    image: images.newYork,
  },
  {
    id: 4,
    image: images.japan,
  },
  {
    id: 5,
    image: images.newYork,
  },
  {
    id: 6,
    image: images.japan,
  },
];

export const apartmentDetails = {
  id: "1",
  title: "Modernica Apartment",
  type: "Apartment",
  rating: 4.8,
  reviews: 1275,
  beds: 8,
  baths: 3,
  size: "2000 sqft",
  price: 17821,
  agent: {
    name: "Natasya Wilodra",
    role: "Owner",
    avatar: images.avatar,
  },
  description:
    "Sleek, modern 2-bedroom apartment with open living space, high-end finishes, and city views. Minutes from downtown, dining, and transit.",
  facilities: [
    "Car Parking",
    "Swimming Pool",
    "Gym & Fitness",
    "Restaurant",
    "Wi-fi & Network",
    "Pet Center",
    "Sport Center",
    "Laundry",
  ],
  gallery: [
    images.newYork,
    images.japan,
    images.newYork,
    images.japan,
    images.newYork,
    images.japan,
    images.newYork,
    images.japan,
    images.newYork,
  ],
  location: "Grand City St. 100, New York, United States",
  review: {
    name: "Charolette Hanlin",
    text: "The apartment is very clean and modern. I really like the interior design. Looks like I'll feel at home 😍",
    avatar: images.avatar,
    likes: 938,
    daysAgo: "6 days ago",
  },
};
