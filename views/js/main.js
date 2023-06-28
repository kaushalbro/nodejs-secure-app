// Get form element
const form = document.getElementById("form");

function formData() {
  console.log("got data");
}
// Handle form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Get form data
  const formData = new FormData(form);
  console.log(formData);
  return;
  try {
    // Call API with form data
    const response = await fetch("https://example.com/api", {
      method: "POST",
      body: formData,
    });

    // Handle API response
    if (response.ok) {
      const data = await response.json();
      console.log("API response:", data);
    } else {
      console.error("API error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("API error:", error);
  }
});
