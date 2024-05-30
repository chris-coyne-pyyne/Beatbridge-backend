import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 8000;

const users = [
  // test users (for mocked data)
  {
    id: "4d2e94ec-a7b1-48d9-8936-8f81acfca57f",
    name: "Sam Jones",
    email: "samjones@gmail.com",
  },
  {
    id: "791b648a-71fe-4630-ac2e-943d41aefb07",
    name: "Sarah Carson",
    email: "sarahcarson@gmail.com",
  },
  {
    id: "578ec1bc-147d-415e-8edb-de52fc2b3b0e",
    name: "Alex Johnson",
    email: "alexjohnson@gmail.com",
  },
  {
    id: "5c914685-54da-49d4-adc5-078b2d14b30e",
    name: "Nat Williams",
    email: "natwilliams@gmail.com",
  },
];

// mocked events
const events = [
  {
    id: "12",
    organizer: {
      id: "5c914685-54da-49d4-adc5-078b2d14b30e",
      email: "natwilliams@gmail.com",
      name: "Nat Williams",
    },
    pic: "https://cdn1.vectorstock.com/i/1000x1000/13/15/poster-for-country-music-festival-vector-28611315.jpg",
    name: "Cool Country Event",
    description: "sample description here...",
    genre: "Country",
    active: true,
    startDate: "April 30",
    endDate: "May 7",
    artists: [
      {
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        player: "artist aaaaaa",
        date: "May 12",
      },
      {
        startTime: "11:30 AM",
        endTime: "2:00 PM",
        player: "artistasfsaf",
        date: "May 10",
      },
      {
        startTime: "3:00 PM",
        endTime: "5:00 PM",
        player: "sdf",
        date: "May 10",
      },
      {
        startTime: "12:00 PM",
        endTime: "3:00 PM",
        player: "blah blah",
        date: "May 11",
      },
      {
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        player: "artist  dfs df",
        date: "May 10",
      },
      {
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        player: "artist xyz",
        date: "May 11",
      },
    ],
  },
  {
    id: "1234",
    organizer: {
      id: "578ec1bc-147d-415e-8edb-de52fc2b3b0e",
      email: "alexjohnson@gmail.com",
      name: "Alex Johnson",
    },
    pic: "https://static.vecteezy.com/system/resources/previews/012/825/177/original/trumpet-logo-jazz-music-festival-logo-vector.jpg",
    name: "Jazz Event",
    description: "sample description here...",
    genre: "Jazz",
    active: true,
    startDate: "June 7",
    endDate: "June 14",
    artists: [],
  },
  {
    id: "122342342234",
    organizer: {
      id: "4d2e94ec-a7b1-48d9-8936-8f81acfca57f",
      email: "samjones@gmail.com",
      name: "Sam Jones",
    },
    pic: "https://images-platform.99static.com/xWEScRj3mwOdRZ7bDsRUYPuzDRQ=/0x0:2000x2000/500x500/top/smart/99designs-contests-attachments/81/81591/attachment_81591882",
    name: "Cool EDM Event",
    description: "sample description here...",
    genre: "Electronic",
    active: true,
    startDate: "April 30",
    endDate: "May 7",
    artists: [],
  },
  {
    id: "1234sdfd",
    organizer: {
      id: "791b648a-71fe-4630-ac2e-943d41aefb07",
      email: "sarahcarson@gmail.com",
      name: "Sarah Carson",
    },
    pic: "https://cdn4.vectorstock.com/i/1000x1000/03/68/rap-festival-logo-colorful-creative-banner-vector-20600368.jpg",
    name: "Hip Hop Event",
    description: "sample description here...",
    genre: "Hip Hop",
    active: true,
    startDate: "June 20",
    endDate: "June 30",
    artists: [],
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  console.log("testing...");
  res.send("Hello, world!");
});

// sign up - just insert user into the list of users
app.post("/signup", async (req, res) => {
  try {
    const userId = uuidv4();
    const newUser = { ...req.body, id: userId };
    users.push(newUser);
    res.status(200).json({ ...newUser, token: "test token..." });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const selectedUser = users.find(
      (user) => user.email === req.body.email.toLowerCase()
    );
    if (!selectedUser) {
      res.status(400).json({ error: "Invalid Credentials" });
    }
    res.status(201).json({
      ...selectedUser,
      token: "test token...",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
});

// get an event from the backend
app.get("/events/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = events.find((event) => event.id === eventId);
    res.status(201).json({
      ...event,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
});

// get all events from the backend
app.get("/events", async (req, res) => {
  try {
    res.status(201).json(events);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
});

// create new event from the backend
app.post("/event", async (req, res) => {
  try {
    // create the event
    const newEvent = { ...req.body };

    // get user
    const requester = users.find((user) => user.id === req.body.userId);
    newEvent.organizer = requester;

    // fill in mock pic (much easier) - this one is just the Vans Warped Tour logo :P
    newEvent.pic =
      "https://static.wixstatic.com/media/650945_43f7cca64d7e4e4594d704b93986679f~mv2.png/v1/fill/w_400,h_324,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/VWT25_WEB%20RES_color.png";

    newEvent.id = uuidv4();

    events.push(newEvent);

    res.status(201).json({ ...newEvent });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`);
});
