const listEl = document.getElementById('reminderList');
const showDueSoonEl = document.getElementById('showDueSoon');
const showOverdueEl = document.getElementById('showOverdue');
const searchEl = document.getElementById('search');

let tenants = [];

function daysDiff(dueDateStr) {
  const today = new Date();
  const due = new Date(dueDateStr);
  const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  return diff;
}

function statusClass(status) {
  return status?.toLowerCase() === 'paid' ? 'status-paid' : 'status-unpaid';
}

function rowClass(diffDays, status) {
  if ((status || '').toLowerCase() === 'paid') return '';
  if (diffDays < 0) return 'overdue';
  if (diffDays <= 3) return 'due-soon';
  return '';
}

// Build a WhatsApp click-to-chat link (free) with prefilled message.
// Numbers should be in full international format, e.g. +2547XXXXXXX
function waLink(phone, msg) {
  if (!phone) return '#';
  const num = phone.startsWith('+') ? phone.slice(1) : phone; // wa.me expects no '+'
  const text = encodeURIComponent(msg);
  return `https://wa.me/${num}?text=${text}`;
}

function makeMessage(t, diff) {
  const when =
    diff < 0 ? `was due on ${t.due_date}` :
    diff === 0 ? `is due today (${t.due_date})` :
    `is due in ${diff} day${diff === 1 ? '' : 's'} (${t.due_date})`;

  return `Hi ${t.name}, this is a reminder that your rent of KSh ${t.rent_amount} for house ${t.house_number} ${when}. Kindly pay on time. Thank you.`;
}

function render() {
  const showDueSoon = showDueSoonEl.checked;
  const showOverdue = showOverdueEl.checked;
  const q = (searchEl.value || '').trim().toLowerCase();

  listEl.innerHTML = '';
  tenants.forEach(t => {
    const diff = daysDiff(t.due_date);
    const isUnpaid = (t.status || '').toLowerCase() === 'unpaid';
    const isDueSoon = isUnpaid && diff <= 3 && diff >= 0;
    const isOverdue = isUnpaid && diff < 0;

    // filter toggles
    if (!((isDueSoon && showDueSoon) || (isOverdue && showOverdue))) return;

    // search filter
    const hay = `${t.name} ${t.house_number}`.toLowerCase();
    if (q && !hay.includes(q)) return;

    const msg = makeMessage(t, diff);
    const link = waLink(t.phone_number, msg);

    const tr = document.createElement('tr');
    tr.className = rowClass(diff, t.status);
    tr.innerHTML = `
      <td>${t.name}</td>
      <td>${t.house_number}</td>
      <td>${t.rent_amount}</td>
      <td>${t.phone_number || ''}</td>
      <td>${t.due_date}</td>
      <td class="${statusClass(t.status)}">${t.status}</td>
      <td>${diff < 0 ? `${Math.abs(diff)}d late` : `${diff}d left`}</td>
      <td>
        <a href="${link}" target="_blank">
          <button>Remind via WhatsApp</button>
        </a>
      </td>
    `;
    listEl.appendChild(tr);
  });

  if (!listEl.children.length) {
    listEl.innerHTML = `<tr><td colspan="8">No tenants match the current filters.</td></tr>`;
  }
}

async function loadReminders() {
  const snap = await db.collection('tenants').get();
  tenants = [];
  snap.forEach(doc => tenants.push({ id: doc.id, ...doc.data() }));
  render();
}

showDueSoonEl.addEventListener('change', render);
showOverdueEl.addEventListener('change', render);
searchEl.addEventListener('input', render);

loadReminders();
