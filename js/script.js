// ----------------------------
// Empowering the Nation - Fee Calculator
// ----------------------------

// Course data (name + price)
const courses = {
  firstAid: 1500,
  sewing: 1500,
  landscaping: 1500,
  lifeSkills: 1500,
  childMinding: 750,
  cooking: 750,
  gardening: 750
};

// Function to calculate total
function calculateTotal() {
  let selectedCourses = [];
  let total = 0;

  // Get all checked courses
  for (const key in courses) {
    const checkbox = document.getElementById(key);
    if (checkbox && checkbox.checked) {
      selectedCourses.push(key);
      total += courses[key];
    }
  }

  // Apply discount based on number of courses
  let discountPercent = 0;
  if (selectedCourses.length === 2) discountPercent = 5;
  else if (selectedCourses.length === 3) discountPercent = 10;
  else if (selectedCourses.length > 3) discountPercent = 15;

  const discountAmount = (total * discountPercent) / 100;
  const subtotalAfterDiscount = total - discountAmount;

  // Apply VAT (15%)
  const vat = subtotalAfterDiscount * 0.15;
  const grandTotal = subtotalAfterDiscount + vat;

  // Display results
  document.getElementById("subtotal").innerText = `R ${total.toFixed(2)}`;
  document.getElementById("discount").innerText = `R ${discountAmount.toFixed(2)} (${discountPercent}%)`;
  document.getElementById("vat").innerText = `R ${vat.toFixed(2)}`;
  document.getElementById("total").innerText = `R ${grandTotal.toFixed(2)}`;

  // Optional: show selected course names
  document.getElementById("selectedCourses").innerText = selectedCourses.length > 0
    ? selectedCourses.map(c => formatName(c)).join(", ")
    : "No courses selected";
}

// Format course names for readability
function formatName(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, str => str.toUpperCase());
}

// Attach event listeners to all checkboxes
window.onload = function () {
  for (const key in courses) {
    const checkbox = document.getElementById(key);
    if (checkbox) checkbox.addEventListener("change", calculateTotal);
  }
};
