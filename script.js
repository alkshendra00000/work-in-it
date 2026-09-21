// State Management
const state = {
	theme: localStorage.getItem('theme') || 'dark',
	transactions: JSON.parse(localStorage.getItem('transactions')) || [
		{ id: 1, desc: 'SaaS Subscription', amount: 120 },
		{ id: 2, desc: 'Client Retainer', amount: 450 },
		{ id: 3, desc: 'Domain Renewal', amount: 15 }
	]
};

// DOM Elements
const themeBtn = document.getElementById('themeToggle');
const dataForm = document.getElementById('dataForm');
const tableBody = document.getElementById('tableBody');
const canvas = document.getElementById('analyticsChart');
const ctx = canvas.getContext('2d');

// Theme Switcher
function applyTheme() {
	document.documentElement.setAttribute('data-theme', state.theme);
	localStorage.setItem('theme', state.theme);
}

themeBtn.addEventListener('click', () => {
	state.theme = state.theme === 'dark' ? 'light' : 'dark';
	applyTheme();
	renderChart();
});

// Render Metrics & Table
function render() {
	tableBody.innerHTML = '';
	let total = 0;

	state.transactions.forEach((t) => {
		total += t.amount;
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>#${t.id}</td>
			<td>${t.desc}</td>
			<td>$${t.amount.toFixed(2)}</td>
			<td><button onclick="deleteTransaction(${t.id})">Delete</button></td>
		`;
		tableBody.appendChild(row);
	});

	document.getElementById('totalRevenue').textContent = `$${total.toFixed(2)}`;
	document.getElementById('totalTransactions').textContent = state.transactions.length;
	document.getElementById('activeUsers').textContent = (state.transactions.length * 14).toString();

	localStorage.setItem('transactions', JSON.stringify(state.transactions));
	renderChart();
}

// Add Transaction
dataForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const desc = document.getElementById('descInput').value;
	const amount = parseFloat(document.getElementById('amountInput').value);

	state.transactions.push({ id: Date.now(), desc, amount });
	dataForm.reset();
	render();
});

// Delete Transaction
window.deleteTransaction = function(id) {
	state.transactions = state.transactions.filter(t => t.id !== id);
	render();
};

// Canvas Chart Rendering
function renderChart() {
	canvas.width = canvas.parentElement.clientWidth - 40;
	canvas.height = 200;
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (state.transactions.length === 0) return;

	const amounts = state.transactions.map(t => t.amount);
	const max = Math.max(...amounts, 100);
	const padding = 20;
	const stepX = (canvas.width - padding * 2) / Math.max(amounts.length - 1, 1);

	ctx.beginPath();
	ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
	ctx.lineWidth = 3;

	amounts.forEach((val, idx) => {
		const x = padding + idx * stepX;
		const y = canvas.height - padding - (val / max) * (canvas.height - padding * 2);
		if (idx === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	});

	ctx.stroke();
}

// Initial Setup
applyTheme();
render();
window.addEventListener('resize', renderChart);
