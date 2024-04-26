import { accounts } from './data.js';

// ELEMENT REFERENCES -----------------------------------------------------------
const accountsContainerEl = document.getElementById('accounts-container');
const spendingsContainerEl = document.getElementById('spendings-container');
const sideMenuEl = document.getElementById('side-menu');
const hamburgerMenuEl = document.getElementById('hamburger-menu');
const footerEl = document.getElementById('footer');

// EVENTS -----------------------------------------------------------------------
accountsContainerEl.addEventListener('click', handleAccountClick);
hamburgerMenuEl.addEventListener('click', toggleMenu);

// FUNCTION CALLS ------------------------------------------------------------------
addCopyright();
renderAccounts();

// FUNCTIONS --------------------------------------------------------------------
// MENU AND FOOTER
function toggleMenu(e) {
  e.preventDefault(); // Prevent the default behavior of the <a> tag
  sideMenuEl.classList.toggle('show-menu');
}

function addCopyright() {
  // Get the current year
  const currentYear = new Date().getFullYear();

  footerEl.innerHTML = `<p>&copy; ${currentYear} BestBank. All rights reserved.</p>`;
}

// ACCOUNTS CONTAINER
// Generate HTML for accounts
function getAccountsHtml(account) {
  return `
    <div class="account" id=${account.id}>
      <p>${account.title}</p>
      <p>$ ${account.balance}</p>
    </div>
  `;
}

function renderAccounts() {
  accountsContainerEl.innerHTML = accounts.map(getAccountsHtml).join('');
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

// SPENDINGS CONTAINER
// Generate HTML for spendings
function getSpendingsHtml(spending) {
  return `
    <div class="spending">
      <p>${spending.category}</p>
      <p>$ ${spending.spent}</p>
    </div>
  `;
}

function showSpendings(selectedAccount) {
  const spendingsHtml = [];

  // if  selectedAccount exists
  if (selectedAccount) {
    // Check if the selected account has spendings
    if (selectedAccount.spendings && selectedAccount.spendings.length > 0) {
      // Generate HTML for each spending and push it to the spendingsHtml array
      selectedAccount.spendings.forEach((spending) => {
        spendingsHtml.push(getSpendingsHtml(spending));
      });
    } else {
      // If the selected account has no spendings, push a message to the spendingsHtml array
      spendingsHtml.push(`<p class="no-spendings">No spendings for this account</p>`);
    }

    // If no account is selected, push a message to the spendingsHtml array
  } else {
    spendingsHtml.push(`<p class="no-spendings">No account selected</p>`);
  }

  // Join the HTML strings in the spendingsHtml array and set the innerHTML of spendingsContainerEl
  spendingsContainerEl.innerHTML = spendingsHtml.join('');
}
