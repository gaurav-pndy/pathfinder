import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary ( at least 2 places to visit each day ) with placeName, Place Details, Place image Url, Geo Coordinates, ticket Pricing, rating, Time to travel each of the location and full schedule of each day about where to visit from which time to which time for 3 days with each day plan with best time to visit. Also include restaurants for meals in between in the itinerary too in JSON format. Give all details as other places in itinerary for the restaurants too. dont include any other text in the response, just give the JSON.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "tripName": "Las Vegas Budget Trip for Couples (3 Days)",\n  "budget": "Cheap",\n  "travelers": "Couple",\n  "hotels": [\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": {\n        "range": "$50-$100 per night (approx.)"\n      },\n      "hotelImageUrl": "https://example.com/circuscircus.jpg", \n      "geoCoordinates": {\n        "latitude": 36.1263,\n        "longitude": -115.1731\n      },\n      "rating": 3.5,\n      "description": "Affordable hotel with a circus theme, offering various entertainment options."\n    },\n    {\n      "hotelName": "La Quinta Inn & Suites by Wyndham Las Vegas",\n      "hotelAddress": "Multiple Locations in Las Vegas",\n      "price": {\n        "range": "$60-$120 per night (approx.)"\n      },\n      "hotelImageUrl": "https://example.com/laquinta.jpg",\n      "geoCoordinates": {\n        "latitude": 36.13,\n        "longitude": -115.18\n      },\n      "rating": 3.8,\n      "description": "Budget-friendly chain hotel with clean rooms and convenient locations."\n    },\n    {\n      "hotelName": "Excalibur Hotel & Casino",\n      "hotelAddress": "3850 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": {\n        "range": "$50-$100 per night (approx.)"\n      },\n      "hotelImageUrl": "https://example.com/excalibur.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1001,\n        "longitude": -115.1728\n      },\n      "rating": 3.6,\n      "description": "Medieval-themed hotel and casino with various amenities at affordable prices."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "theme": "Strip Exploration & Fremont Street",\n      "bestTime": "Morning to Evening",\n      "schedule": [\n        {\n          "time": "9:00 AM - 12:00 PM",\n          "placeName": "Bellagio Conservatory & Botanical Gardens",\n          "placeDetails": "Free to enter, stunning floral displays.",\n          "placeImageUrl": "https://example.com/bellagiogardens.jpg",\n          "geoCoordinates": {\n            "latitude": 36.111,\n            "longitude": -115.17\n          },\n          "ticketPricing": "Free",\n          "rating": 4.5,\n          "travelTime": "15 mins (taxi/bus)"\n        },\n        {\n          "time": "12:30 PM - 1:30 PM",\n          "placeName": "In-N-Out Burger (near Bellagio)",\n          "placeDetails": "Popular burger chain, affordable and tasty.",\n          "placeImageUrl": "https://example.com/innout.jpg",\n          "geoCoordinates": {\n              "latitude": 36.11,\n              "longitude": -115.171\n          },\n          "ticketPricing": "Variable",\n          "rating": 4.2,\n          "travelTime": "5 mins (walk)"\n        },\n        {\n          "time": "2:00 PM - 6:00 PM",\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "Free to enter, vibrant pedestrian mall with light shows.",\n          "placeImageUrl": "https://example.com/fremontstreet.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1692,\n            "longitude": -115.1407\n          },\n          "ticketPricing": "Free",\n          "rating": 4.0,\n          "travelTime": "30 mins (taxi/bus)"\n        },\n        {\n          "time": "6:30 PM - 7:30 PM",\n          "placeName": "Eat at a local eatery near Fremont Street",\n          "placeDetails": "Various options for affordable meals.",\n          "placeImageUrl": "https://example.com/fremontstreetfood.jpg",\n          "geoCoordinates": {\n              "latitude": 36.169,\n              "longitude": -115.14\n          },\n          "ticketPricing": "Variable",\n          "rating": 4.0,\n          "travelTime": "5 mins (walk)"\n        }\n      ]\n    },\n    "day2": {\n      "theme": "Poolside Relaxation & The Strip at Night",\n      "bestTime": "Afternoon to Night",\n      "schedule": [\n        {\n          "time": "11:00 AM - 4:00 PM",\n          "placeName": "Hotel Pool",\n          "placeDetails": "Relax and enjoy the pool at your hotel.",\n          "placeImageUrl": "https://example.com/hotelpool.jpg",\n          "geoCoordinates": {\n            "latitude": "Your Hotel\'s Latitude",\n            "longitude": "Your Hotel\'s Longitude"\n          },\n          "ticketPricing": "Free (if at your hotel)",\n          "rating": "Variable",\n          "travelTime": "0 mins"\n        },\n        {\n          "time": "4:30 PM - 5:30 PM",\n          "placeName": "Seven Magic Mountains",\n          "placeDetails": "Colorful art installation, short drive from the Strip.",\n          "placeImageUrl": "https://example.com/sevenmagicmountains.jpg",\n          "geoCoordinates": {\n            "latitude": 36.0691,\n            "longitude": -114.975\n          },\n          "ticketPricing": "Free",\n          "rating": 4.2,\n          "travelTime": "30 mins (taxi/Uber)"\n        },\n        {\n          "time": "6:00 PM - 8:00 PM",\n          "placeName": "Dinner at a Casual Restaurant on the Strip",\n          "placeDetails": "Many options for budget-friendly dining.",\n          "placeImageUrl": "https://example.com/stripdinner.jpg",\n          "geoCoordinates": {\n              "latitude": 36.11,\n              "longitude": -115.17\n          },\n          "ticketPricing": "Variable",\n          "rating": 4.0,\n          "travelTime": "15 mins (taxi/Uber/walk)"\n        },\n        {\n          "time": "8:30 PM - 10:00 PM",\n          "placeName": "Walk the Strip at Night",\n          "placeDetails": "Experience the illuminated hotels and casinos.",\n          "placeImageUrl": "https://example.com/stripnight.jpg",\n          "geoCoordinates": {\n            "latitude": 36.11,\n            "longitude": -115.17\n          },\n          "ticketPricing": "Free",\n          "rating": 4.5,\n          "travelTime": "Variable"\n        }\n      ]\n    },\n    "day3": {\n      "theme": "Red Rock Canyon & Downtown Exploration",\n      "bestTime": "Morning to Afternoon",\n      "schedule": [\n        {\n          "time": "9:00 AM - 12:00 PM",\n          "placeName": "Red Rock Canyon National Conservation Area",\n          "placeDetails": "Scenic drives and hiking trails (entrance fee applies).",\n          "placeImageUrl": "https://example.com/redrockcanyon.jpg",\n          "geoCoordinates": {\n            "latitude": 36.2083,\n            "longitude": -115.7917\n          },\n          "ticketPricing": "$15 per vehicle (approx.)",\n          "rating": 4.7,\n          "travelTime": "30-45 mins (car)"\n        },\n        {\n          "time": "12:30 PM - 1:30 PM",\n          "placeName": "Picnic Lunch at Red Rock Canyon",\n          "placeDetails": "Pack your own lunch to save money.",\n          "placeImageUrl": "https://example.com/redrockpicnic.jpg",\n          "geoCoordinates": {\n            "latitude": 36.20,\n            "longitude": -115.80\n          },\n          "ticketPricing": "Variable (based on food items)",\n          "rating": 4.0,\n          "travelTime": "0 mins"\n        },\n        {\n          "time": "2:00 PM - 4:00 PM",\n          "placeName": "Downtown Container Park",\n          "placeDetails": "Unique shopping and dining area with a giant praying mantis.",\n          "placeImageUrl": "https://example.com/containerpark.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1663,\n            "longitude": -115.1421\n          },\n          "ticketPricing": "Free to enter",\n          "rating": 4.2,\n          "travelTime": "30 mins (taxi/bus)"\n        },\n        {\n          "time": "4:30 PM - 5:30 PM",\n          "placeName": "Dinner near Downtown",\n          "placeDetails": "Choose from variety of affordable restaurants.",\n          "placeImageUrl": "https://example.com/downtowndinner.jpg",\n          "geoCoordinates": {\n            "latitude": 36.16,\n            "longitude": -115.14\n          },\n          "ticketPricing": "Variable",\n          "rating": 4.0,\n          "travelTime": "5 mins (walk)"\n        }\n      ]\n    }\n  }\n}\n```\n',
        },
      ],
    },
  ],
});