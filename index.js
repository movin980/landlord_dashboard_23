async function loadDashboard() {
  const snapshot = await db.collection("tenants").get();
  let totalTenants = 0;
  let totalRent = 0;
  let dueSoon = 0;
  let overdue = 0;
  const today = new Date();

  snapshot.forEach(doc => {
    totalTenants++;
    const t = doc.data();
    totalRent += t.rent_amount;
    const dueDate = new Date(t.due_date);
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (t.status.toLowerCase() === "unpaid") {
      if (diffDays < 0) overdue++;
      else if (diffDays <= 3) dueSoon++;
    }
  });

  document.getElementById("totalTenants").innerText = totalTenants;
  document.getElementById("totalRent").innerText = totalRent;
  document.getElementById("dueSoon").innerText = dueSoon;
  document.getElementById("overdue").innerText = overdue;
}

loadDashboard();
