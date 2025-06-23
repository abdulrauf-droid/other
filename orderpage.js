const form = document.getElementById("orderForm");
const mainOrderBtn = document.getElementById("mainOrderBtn");
const orderOptions = document.getElementById("orderOptions");
const whatsappBtn = document.getElementById("whatsappBtn");
const codBtn = document.getElementById("codBtn");

function getOrderDetails() {
  const name = form.name.value;
  const phone = form.phone.value;
  const address = form.address.value;
  const quantity = form.quantity.value;
  const notes = form.notes.value;

  return { name, phone, address, quantity, notes };
}

// Step 1: Show options when "Place Order" clicked
mainOrderBtn.addEventListener("click", function () {
  orderOptions.style.display = "flex";
  mainOrderBtn.style.display = "none";
});

// Step 2: WhatsApp Button
whatsappBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const { name, phone, address, quantity, notes } = getOrderDetails();

  const message = `📦 *New Order via WhatsApp*

🛍️ Product: Smart Watch
💰 Price: PKR 2,500
🔢 Quantity: ${quantity}

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}
📝 Notes: ${notes || "None"}
💵 Payment Method: Cash on Delivery`;

  const encoded = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/923001234567?text=${encoded}`;
  window.open(whatsappURL, "_blank");
});

codBtn.addEventListener("click", function () {
  // ✅ Instantly show thank you message & hide form
  form.style.display = "none";
  document.getElementById("thankYouBox").style.display = "flex";

  // ✅ Submit form data silently using fetch
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData
  })
  .then(response => {
    console.log("Order submitted");
  })
  .catch(error => {
    alert("Error sending order. Please check your connection.");
  });
});
const city = form.city.value;
const province = form.province.value;
const provinceCityMap = {
  "Punjab": ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Sialkot", "Bahawalpur", "Gujranwala", "Sargodha", "Rahim Yar Khan"],
  "Sindh": ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah", "Shikarpur"],
  "Khyber Pakhtunkhwa": ["Peshawar", "Mardan", "Abbottabad", "Swat", "Kohat"],
  "Balochistan": ["Quetta", "Turbat", "Gwadar", "Khuzdar"],
  "Islamabad Capital Territory": ["Islamabad"],
  "Gilgit-Baltistan": ["Gilgit", "Skardu", "Astore"],
  "Azad Jammu & Kashmir": ["Muzaffarabad", "Mirpur", "Rawalakot"]
};

const provinceSelect = document.getElementById("province");
const citySelect = document.getElementById("city");

provinceSelect.addEventListener("change", function () {
  const selectedProvince = provinceSelect.value;
  const cities = provinceCityMap[selectedProvince] || [];

  // Clear old options
  citySelect.innerHTML = '<option value="">Select City</option>';

  // Add new city options
  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
});
// 🔄 Switch the main image safely
function changeImage(src) {
  const img = document.getElementById("main-image");

  // Optional: add a fade-out effect
  img.style.opacity = 0.3;

  // Load the new image first
  const image = new Image();
  image.onload = function () {
    img.src = src;
    img.style.opacity = 1; // Fade back in
  };
  image.onerror = function () {
    alert("Image failed to load. Please check the file name or location.");
    img.style.opacity = 1;
  };

  image.src = src;
}

// 🔽 Scroll to order form
function scrollToOrder() {
  const form = document.getElementById("orderForm");
  form.scrollIntoView({ behavior: "smooth" });
}
