// Currency denominations
const DENOMINATIONS = {
  bills: {
    100: 100.0,
    50: 50.0,
    20: 20.0,
    10: 10.0,
    5: 5.0,
    1: 1.0,
  },
  coins: {
    quarters: 0.25,
    dimes: 0.1,
    nickels: 0.05,
    pennies: 0.01,
  },
};

// Minimum amount to keep in drawer
const MINIMUM_DRAWER_AMOUNT = 200.0;

// Calculate total amount in drawer
function calculateTotal() {
  const bills100 = parseInt(document.getElementById("bills100").value) || 0;
  const bills50 = parseInt(document.getElementById("bills50").value) || 0;
  const bills20 = parseInt(document.getElementById("bills20").value) || 0;
  const bills10 = parseInt(document.getElementById("bills10").value) || 0;
  const bills5 = parseInt(document.getElementById("bills5").value) || 0;
  const bills1 = parseInt(document.getElementById("bills1").value) || 0;

  const quarters = parseInt(document.getElementById("quarters").value) || 0;
  const dimes = parseInt(document.getElementById("dimes").value) || 0;
  const nickels = parseInt(document.getElementById("nickels").value) || 0;
  const pennies = parseInt(document.getElementById("pennies").value) || 0;

  const billsTotal =
    bills100 * 100 +
    bills50 * 50 +
    bills20 * 20 +
    bills10 * 10 +
    bills5 * 5 +
    bills1 * 1;
  const coinsTotal =
    quarters * 0.25 + dimes * 0.1 + nickels * 0.05 + pennies * 0.01;

  const total = billsTotal + coinsTotal;

  document.getElementById("totalAmount").textContent = `$${total.toFixed(2)}`;

  return {
    total: total,
    breakdown: {
      bills100: bills100,
      bills50: bills50,
      bills20: bills20,
      bills10: bills10,
      bills5: bills5,
      bills1: bills1,
      quarters: quarters,
      dimes: dimes,
      nickels: nickels,
      pennies: pennies,
    },
  };
}

// Calculate what needs to be withdrawn
function calculateWithdrawal() {
  const salesAmount =
    parseFloat(document.getElementById("salesAmount").value) || 0;
  const drawerData = calculateTotal();
  const drawerTotal = drawerData.total;

  if (salesAmount <= 0) {
    showMessage("Please enter a valid sales amount.", "error");
    return;
  }

  if (drawerTotal < MINIMUM_DRAWER_AMOUNT) {
    showMessage(
      "Error: Drawer total is less than required minimum of $200.",
      "error"
    );
    return;
  }

  const availableToWithdraw =
    Math.round((drawerTotal - MINIMUM_DRAWER_AMOUNT) * 100) / 100; // Handle floating point precision
  console.log("Available to Withdraw: ", availableToWithdraw);
  console.log("Sales Amount: ", salesAmount);

  if (salesAmount > availableToWithdraw) {
    showMessage(
      `Error: Cannot withdraw $${salesAmount.toFixed(
        2
      )}. Maximum available: $${availableToWithdraw.toFixed(2)}`,
      "error"
    );
    return;
  }

  // Calculate optimal withdrawal strategy
  const withdrawalPlan = calculateOptimalWithdrawal(
    salesAmount,
    drawerData.breakdown
  );

  if (!withdrawalPlan.success) {
    showMessage(withdrawalPlan.message, "error");
    return;
  }

  displayWithdrawalResults(salesAmount, withdrawalPlan.plan, drawerTotal);
  showMessage("Withdrawal calculated successfully!", "success");
}

// Calculate optimal withdrawal plan
function calculateOptimalWithdrawal(targetAmount, available) {
  const plan = {
    bills100: 0,
    bills50: 0,
    bills20: 0,
    bills10: 0,
    bills5: 0,
    bills1: 0,
    quarters: 0,
    dimes: 0,
    nickels: 0,
    pennies: 0,
  };

  let remaining = Math.round(targetAmount * 100) / 100; // Handle floating point precision
  let remainingCents = Math.round(remaining * 100);

  // Create a copy of available amounts
  const availableCopy = { ...available };

  // Try to withdraw larger denominations first
  const denominations = [
    { key: "bills100", value: 10000, available: availableCopy.bills100 },
    { key: "bills50", value: 5000, available: availableCopy.bills50 },
    { key: "bills20", value: 2000, available: availableCopy.bills20 },
    { key: "bills10", value: 1000, available: availableCopy.bills10 },
    { key: "bills5", value: 500, available: availableCopy.bills5 },
    { key: "bills1", value: 100, available: availableCopy.bills1 },
    { key: "quarters", value: 25, available: availableCopy.quarters },
    { key: "dimes", value: 10, available: availableCopy.dimes },
    { key: "nickels", value: 5, available: availableCopy.nickels },
    { key: "pennies", value: 1, available: availableCopy.pennies },
  ];

  for (const denom of denominations) {
    if (remainingCents >= denom.value && denom.available > 0) {
      const maxCanTake = Math.min(
        Math.floor(remainingCents / denom.value),
        denom.available
      );

      plan[denom.key] = maxCanTake;
      remainingCents -= maxCanTake * denom.value;
      availableCopy[denom.key] -= maxCanTake;
    }
  }

  if (remainingCents > 0) {
    return {
      success: false,
      message: `Cannot make exact change. Missing $${(
        remainingCents / 100
      ).toFixed(2)} in appropriate denominations.`,
    };
  }

  return {
    success: true,
    plan: plan,
  };
}

// Display withdrawal results
function displayWithdrawalResults(withdrawalAmount, plan, drawerTotal) {
  const resultsDiv = document.getElementById("withdrawalResults");
  const instructionsDiv = document.getElementById("withdrawalInstructions");

  let instructions = "";

  if (plan.bills100 > 0) {
    instructions += `<div class="flex justify-between bg-gray-700 p-2 rounded">
            <span>Take ${plan.bills100} × $100 bills</span>
            <span class="text-green-400">$${(plan.bills100 * 100).toFixed(
              2
            )}</span>
        </div>`;
  }

  if (plan.bills50 > 0) {
    instructions += `<div class="flex justify-between bg-gray-700 p-2 rounded">
            <span>Take ${plan.bills50} × $50 bills</span>
            <span class="text-green-400">$${(plan.bills50 * 50).toFixed(
              2
            )}</span>
        </div>`;
  }

  if (plan.bills20 > 0) {
    instructions += `<div class="flex justify-between bg-gray-700 p-2 rounded">
            <span>Take ${plan.bills20} × $20 bills</span>
            <span class="text-green-400">$${(plan.bills20 * 20).toFixed(
              2
            )}</span>
        </div>`;
  }

  if (plan.bills10 > 0) {
    instructions += `<div class="flex justify-between bg-gray-700 p-2 rounded">
            <span>Take ${plan.bills10} × $10 bills</span>
            <span class="text-green-400">$${(plan.bills10 * 10).toFixed(
              2
            )}</span>
        </div>`;
  }

  if (plan.bills5 > 0) {
    instructions += `<div class="flex justify-between bg-gray-700 p-2 rounded">
            <span>Take ${plan.bills5} × $5 bills</span>
            <span class="text-green-400">$${(plan.bills5 * 5).toFixed(2)}</span>
        </div>`;
  }

  if (plan.bills1 > 0) {
    instructions += `<div class="flex justify-between bg-gray-700 p-2 rounded">
            <span>Take ${plan.bills1} × $1 bills</span>
            <span class="text-green-400">$${(plan.bills1 * 1).toFixed(2)}</span>
        </div>`;
  }

  if (plan.quarters > 0) {
    instructions += `<div class="flex justify-between bg-gray-700 p-2 rounded">
            <span>Take ${plan.quarters} quarters</span>
            <span class="text-yellow-400">$${(plan.quarters * 0.25).toFixed(
              2
            )}</span>
        </div>`;
  }

  if (plan.dimes > 0) {
    instructions += `<div class="flex justify-between bg-gray-700 p-2 rounded">
            <span>Take ${plan.dimes} dimes</span>
            <span class="text-yellow-400">$${(plan.dimes * 0.1).toFixed(
              2
            )}</span>
        </div>`;
  }

  if (plan.nickels > 0) {
    instructions += `<div class="flex justify-between bg-gray-700 p-2 rounded">
            <span>Take ${plan.nickels} nickels</span>
            <span class="text-yellow-400">$${(plan.nickels * 0.05).toFixed(
              2
            )}</span>
        </div>`;
  }

  if (plan.pennies > 0) {
    instructions += `<div class="flex justify-between bg-gray-700 p-2 rounded">
            <span>Take ${plan.pennies} pennies</span>
            <span class="text-yellow-400">$${(plan.pennies * 0.01).toFixed(
              2
            )}</span>
        </div>`;
  }

  instructionsDiv.innerHTML = instructions;
  document.getElementById(
    "withdrawalAmount"
  ).textContent = `$${withdrawalAmount.toFixed(2)}`;
  document.getElementById("remainingAmount").textContent = `$${(
    drawerTotal - withdrawalAmount
  ).toFixed(2)}`;

  resultsDiv.style.display = "block";
}

// Save record to local storage
function saveRecord() {
  const drawerNumber = document.getElementById("drawerNumber").value;
  const salesAmount =
    parseFloat(document.getElementById("salesAmount").value) || 0;

  if (!drawerNumber) {
    showMessage("Please enter a drawer number.", "error");
    return;
  }

  const drawerData = calculateTotal();

  const record = {
    id: Date.now(),
    drawerNumber: drawerNumber,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    datetime: new Date().toISOString(),
    totalAmount: drawerData.total,
    salesAmount: salesAmount,
    breakdown: drawerData.breakdown,
  };

  // Get existing records
  const existingRecords = JSON.parse(
    localStorage.getItem("cvsTillRecords") || "[]"
  );

  // Add new record
  existingRecords.push(record);

  // Save back to localStorage
  localStorage.setItem("cvsTillRecords", JSON.stringify(existingRecords));

  showMessage(`Record saved for Drawer #${drawerNumber}!`, "success");
  loadRecords();

  // Clear form
  clearForm();
}

// Load records from local storage
function loadRecords() {
  const records = JSON.parse(localStorage.getItem("cvsTillRecords") || "[]");
  const recordsList = document.getElementById("recordsList");

  if (records.length === 0) {
    recordsList.innerHTML =
      '<p class="text-gray-500 text-center py-4">No records found</p>';
    return;
  }

  // Sort records by datetime (newest first)
  records.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  let recordsHTML = "";
  records.forEach((record) => {
    recordsHTML += `
            <div class="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <span class="font-semibold text-purple-400">Drawer #${
                          record.drawerNumber
                        }</span>
                        <span class="text-gray-400 ml-2">${record.date} at ${
      record.time
    }</span>
                    </div>
                    <button onclick="deleteRecord(${
                      record.id
                    })" class="text-red-400 hover:text-red-300 text-sm">
                        Delete
                    </button>
                </div>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    <div class="text-gray-300">Total: <span class="text-green-400">$${record.totalAmount.toFixed(
                      2
                    )}</span></div>
                    <div class="text-gray-300">Sales: <span class="text-blue-400">$${record.salesAmount.toFixed(
                      2
                    )}</span></div>
                </div>
            </div>
        `;
  });

  recordsList.innerHTML = recordsHTML;
}

// Delete a record
function deleteRecord(recordId) {
  if (!confirm("Are you sure you want to delete this record?")) {
    return;
  }

  const records = JSON.parse(localStorage.getItem("cvsTillRecords") || "[]");
  const filteredRecords = records.filter((record) => record.id !== recordId);

  localStorage.setItem("cvsTillRecords", JSON.stringify(filteredRecords));
  showMessage("Record deleted successfully!", "success");
  loadRecords();
}

// Show status message
function showMessage(message, type) {
  const messagesDiv = document.getElementById("statusMessages");

  const messageClass =
    type === "error"
      ? "bg-red-800 border-red-600 text-red-200"
      : "bg-green-800 border-green-600 text-green-200";

  const messageHTML = `
        <div class="p-4 rounded-lg border ${messageClass} animate-pulse">
            ${message}
        </div>
    `;

  messagesDiv.innerHTML = messageHTML;

  // Clear message after 5 seconds
  setTimeout(() => {
    messagesDiv.innerHTML = "";
  }, 5000);
}

// Clear form
function clearForm() {
  document.getElementById("drawerNumber").value = "";
  document.getElementById("salesAmount").value = "";
  document.getElementById("bills100").value = "";
  document.getElementById("bills50").value = "";
  document.getElementById("bills20").value = "";
  document.getElementById("bills10").value = "";
  document.getElementById("bills5").value = "";
  document.getElementById("bills1").value = "";
  document.getElementById("quarters").value = "";
  document.getElementById("dimes").value = "";
  document.getElementById("nickels").value = "";
  document.getElementById("pennies").value = "";
  document.getElementById("withdrawalResults").style.display = "none";
  calculateTotal();
}

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  calculateTotal();
  loadRecords();
});
