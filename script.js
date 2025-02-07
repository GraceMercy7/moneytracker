let balance = 0;
const balanceElement = document.getElementById("balance");
const transactionList = document.getElementById("transaction-list");

function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = new Date();
    const formattedDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();

    if (description === "" || isNaN(amount)) {
        alert("Please enter valid details!");
        return;
    }

    // Update balance
    balance += amount;
    balanceElement.textContent = `$${balance.toFixed(2)}`;

    // Create transaction item (like a selectable match)
    const transactionItem = document.createElement("li");
    transactionItem.classList.add(amount >= 0 ? "positive" : "negative");
    transactionItem.style.position = "relative";
    transactionItem.style.display = "flex";
    transactionItem.style.flexDirection = "column";
    transactionItem.style.justifyContent = "space-between";
    transactionItem.style.alignItems = "flex-start";
    transactionItem.style.padding = "10px";
    transactionItem.style.border = "1px solid #ccc";
    transactionItem.style.borderRadius = "5px";
    transactionItem.style.cursor = "pointer";
    transactionItem.style.margin = "5px 0";
    transactionItem.innerHTML = `<span style="display: flex; justify-content: space-between; width: 100%;"><span>${description}</span><span style="margin-left: 20px;">$${amount.toFixed(2)}</span></span><br><small>${formattedDate}</small>`;

    // Toggle selection
    transactionItem.onclick = function () {
        transactionItem.classList.toggle("selected");
        transactionItem.style.backgroundColor = transactionItem.classList.contains("selected") ? "#f0f0f0" : "white";
    };

    // Create small delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "✖";
    deleteButton.style.position = "absolute";
    deleteButton.style.bottom = "5px";
    deleteButton.style.right = "5px";
    deleteButton.style.width = "16px";
    deleteButton.style.height = "16px";
    deleteButton.style.fontSize = "10px";
    deleteButton.style.display = "flex";
    deleteButton.style.alignItems = "center";
    deleteButton.style.justifyContent = "center";
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.border = "none";
    deleteButton.style.color = "white";
    deleteButton.style.borderRadius = "50%";
    deleteButton.style.cursor = "pointer";
    deleteButton.onclick = function (event) {
        event.stopPropagation(); // Prevent triggering selection
        transactionList.removeChild(transactionItem);
        balance -= amount;
        balanceElement.textContent = `$${balance.toFixed(2)}`;
    };
    
    transactionItem.appendChild(deleteButton);
    transactionList.appendChild(transactionItem);

    // Clear inputs
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}
