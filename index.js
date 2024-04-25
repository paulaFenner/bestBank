import { accounts } from './data.js';

const accountsContainerEl = document.getElementById('accounts-container');
const spendingsContainerEl = document.getElementById('spendings-container');

accountsContainerEl.addEventListener('click', handleAccountClick);

function renderAccounts() {
  accountsContainerEl.innerHTML = accounts.map(getAccountHtml).join('');
}

function handleAccountClick(e) {
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

function showSpendings(selectedAccount) {
  if (!selectedAccount) {
    clearSelection();
    return;
  }

  const { spendings } = selectedAccount;
  if (!spendings.length) {
    spendingsContainerEl.innerHTML = `<p class="no-spendings">No spendings for this account 💰💰💰</p>`;
    return;
  }

  spendingsContainerEl.innerHTML = spendings.map(getSpendingHtml).join('');
}

function getSpendingHtml(spending) {
  return `
    <div class="spending">
      <p>${spending.category}</p>
      <p>$ ${spending.spent}</p>
    </div>
  `;
}

function clearSelection() {
  spendingsContainerEl.innerHTML = `<p class="no-spendings">No account selected</p>`;
}

function addCopyright() {
  // Get the current year
  const currentYear = new Date().getFullYear();
  const footer = document.getElementById('footer');

  footer.innerHTML = `<p>&copy; ${currentYear} BestBank. All rights reserved.</p>`;
}

renderAccounts();
addCopyright();
