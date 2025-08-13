const tenantForm = document.getElementById('tenantForm');
const tenantList = document.getElementById('tenantList');

tenantForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await db.collection("tenants").add({
    name: document.getElementById('name').value,
    house_number: document.getElementById('house_number').value,
    rent_amount: Number(document.getElementById('rent_amount').value),
    phone_number: document.getElementById('phone_number').value,
    due_date: document.getElementById('due_date').value,
    status: document.getElementById('status').value
  });
  tenantForm.reset();
  loadTenants();
});

async function loadTenants() {
  tenantList.innerHTML = "";
  const snapshot = await db.collection("tenants").get();
  snapshot.forEach(doc => {
    const t = doc.data();
    tenantList.innerHTML += `
      <tr>
        <td>${t.name}</td>
        <td>${t.house_number}</td>
        <td>${t.rent_amount}</td>
        <td>${t.phone_number}</td>
        <td>${t.due_date}</td>
        <td class="${t.status.toLowerCase() === 'paid' ? 'status-paid' : 'status-unpaid'}">${t.status}</td>
      </tr>
    `;
  });
}

loadTenants();
