import { accounts } from './data.js';

const accountsContainerEl = document.getElementById('accounts-container');
const spendingsContainerEl = document.getElementById('spendings-container');

accountsContainerEl.addEventListener('click', function (e) {
  let selectedAccountId;

  if (e.target.classList.contains('account')) {
    selectedAccountId = e.target.id;
  } else if (e.target.nodeName === 'P') {
    selectedAccountId = e.target.parentElement.id;
  }

  const selectedAccount = accounts.find((account) => account.id === parseInt(selectedAccountId));
  showSpendings(selectedAccount);
});

function getAccountsHtml() {
  let accountsHtml = '';

  accounts.forEach((account) => {
    accountsHtml += `
    <div class="account" id=${account.id}>
      <p>${account.title}</p>
      <p>$ ${account.balance}</p>
  </div>   
    `;
  });
  return accountsHtml;
}

function showSpendings(selectedAccount) {
  spendingsContainerEl.innerHTML = '';

  if (selectedAccount) {
    const accountId = selectedAccount.id;
    const account = accounts.find((acc) => acc.id === accountId);
    if (account) {
      if (account.spendings.length > 0) {
        populateSpendings(account);
      } else {
        spendingsContainerEl.innerHTML = `<p class="no-spendings">No spendings for this account</p>`;
      }
    } else {
      spendingsContainerEl.innerHTML = `<p class="no-spendings">Account not found</p>`;
    }
  } else {
    spendingsContainerEl.innerHTML = `<p class="no-spendings">No account selected</p>`;
  }
}

function populateSpendings(selectedAccount) {
  let spendingsHtml = '';

  selectedAccount.spendings.forEach((spending) => {
    spendingsHtml += `
      <div class="spending">
        <p>${spending.category}</p>
        <p>$ ${spending.spent}</p>
      </div>
    `;
  });

  spendingsContainerEl.innerHTML = spendingsHtml;
}

function render() {
  accountsContainerEl.innerHTML = getAccountsHtml();
}

render();
