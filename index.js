import { accounts } from './data.js';

const accountsContainerEl = document.getElementById('accounts-container');
const spendingsContainerEl = document.getElementById('spendings-container');
const sideMenuEl = document.getElementById('side-menu');
const hamburgerMenuEl = document.getElementById('hamburger-menu');

accountsContainerEl.addEventListener('click', handleAccountClick);
hamburgerMenuEl.addEventListener('click', toggleMenu);

function toggleMenu(e) {
  e.preventDefault(); // Prevent the default behavior of the <a> tag
  sideMenuEl.classList.toggle('show-menu');
}

function renderAccounts() {
  accountsContainerEl.innerHTML = accounts.map(getAccountHtml).join('');
}

function handleAccountClick(e) {
  // Find the closest ancestor with the 'account' class and get its id
  const selectedAccountId = e.target.closest('.account')?.id;
  const selectedAccount = findAccountById(selectedAccountId);
  showSpendings(selectedAccount);
}

function findAccountById(id) {
  return accounts.find((account) => account.id === parseInt(id));
}

function getAccountHtml(account) {
  return `
    <div class="account" id=${account.id}>
      <p>${account.title}</p>
      <p>$ ${account.balance}</p>
    </div>
  `;
}

// Show spendings for the selected account
function showSpendings(selectedAccount) {
  if (!selectedAccount) {
    noSelection();
    return;
  }

  // If the selected account has no spendings, display a message
  const { spendings } = selectedAccount;
  if (!spendings.length) {
    spendingsContainerEl.innerHTML = `<p class="no-spendings">No spendings for this account 💰💰💰</p>`;
    return;
  }

  // Generate HTML for each spending and join them together
  spendingsContainerEl.innerHTML = spendings.map(getSpendingHtml).join('');
}

// Generate HTML for a spending
function getSpendingHtml(spending) {
  return `
    <div class="spending">
      <p>${spending.category}</p>
      <p>$ ${spending.spent}</p>
    </div>
  `;
}

function noSelection() {
  spendingsContainerEl.innerHTML = `<p class="no-spendings">No account selected</p>`;
}

function addCopyright() {
  // Get the current year
  const currentYear = new Date().getFullYear();
  const footer = document.getElementById('footer');

  footer.innerHTML = `<p>&copy; ${currentYear} BestBank. All rights reserved.</p>`;
}

// Render the accounts and add copyright information
renderAccounts();
addCopyright();
