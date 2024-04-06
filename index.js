const API_URl = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2402-FTB-ET-WEB-FT/events";

// Create a function that fetches the data from the API
const fetchEvents = async () => {
  try {
    const response = await fetch(API_URl);
    const events = await response.json();
    console.log("events", events);
    render (events);
  }
  catch (error) {
    console.error(error);
  }



// Create a function that renders the data to the page
 const render = (events) => {
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = "";
    events.forEach(event => {
      const eventItem = document.createElement("li");
      eventItem.innerHTML = `
        <h2>${event.name}</h2>
        <p>${event.date}</p>
        <p>${event.location}</p>
        <p>${event.description}</p>
      `;
      eventList.appendChild(eventItem);
    });
  }

// Call the fetchEvents function
fetchEvents();

// Add an event to the list
const addEvent = async (event) => {
  try {
    const response = await fetch(API_URl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    });
    const newEvent = await response.json();
    console.log("newEvent", newEvent);
    fetchEvents();
  }
  catch (error) {
    console.error(error);
  }
}

// Add an event listner to the form to add an event
const form = document.getElementById("event-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const eventDetails = {
    name: formData.get("name"),
    date: formData.get("date"),
    location: formData.get("location"),
    description: formData.get("description")
  };
  addEvent(eventDetails);
  form.reset();
});

// Delete an event from the list
const deleteEvent = async (id) => {
  try {
    const response = await fetch(`${API_URl}/${id}`, {
      method: "DELETE"
    });
    const deletedEvent = await response.json();
    console.log("deletedEvent", deletedEvent);
    fetchEvents();
  }
  catch (error) {
    console.error(error);
  }
}

