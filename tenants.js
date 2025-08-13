import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tenantForm = document.getElementById('tenantForm');
const tenantList = document.getElementById('tenantList');

// Add Tenant
tenantForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "tenants"), {
      name: document.getElementById('name').value,
      house_number: document.getElementById('house_number').value,
      rent_amount: Number(document.getElementById('rent_amount').value),
      phone_number: document.getElementById('phone_number').value,
      due_date: document.getElementById('due_date').value,
      status: document.getElementById('status').value
    });

    tenantForm.reset();
    loadTenants();
  } catch (err) {
    console.error("Error adding tenant:", err);
  }
});

// Load Tenants
async function loadTenants() {
  tenantList.innerHTML = "";
  const snapshot = await getDocs(collection(db, "tenants"));
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
