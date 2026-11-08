import View from './View.js';
class ExpenseView extends View {
  constructor() {super('#expense-section'); this.error = ''; this.editId = null;}
  _generateMarkup(data) {
    const editing = data.find(item => item.id === this.editId);
    return `<div class="card"><h2 class="section-title">${editing ? 'Edit expense' : 'Add an expense'}</h2><p class="section-desc">Keep a record of where your money goes.</p><form id="expense-form" novalidate><div class="field"><label for="expense-name">Expense name</label><input id="expense-name" name="name" maxlength="70" placeholder="e.g. Lunch" value="${editing ? this.escapeHTML(editing.name) : ''}" required></div><div class="field"><label for="expense-amount">Amount (₱)</label><input id="expense-amount" name="amount" type="number" min="0.01" step="0.01" placeholder="e.g. 75" value="${editing ? this.escapeHTML(editing.amount) : ''}" required></div><div class="field"><label for="expense-category">Category</label><select id="expense-category" name="category">${['Food','Transport','School','Other'].map(category => `<option value="${category}" ${editing?.category === category ? 'selected' : ''}>${category}</option>`).join('')}</select></div>${this.error ? `<p class="error" role="alert">${this.escapeHTML(this.error)}</p>` : ''}<button class="btn btn-full" type="submit">${editing ? 'Update expense' : '+ Add expense'}</button>${editing ? '<button class="btn btn-secondary btn-full" id="cancel-edit" type="button" style="margin-top:9px">Cancel editing</button>' : ''}</form><div class="list-header"><h3>Recent expenses</h3><span class="count">${data.length} item${data.length === 1 ? '' : 's'}</span></div><div>${data.length ? data.map(item => `<div class="expense-row"><div><div class="expense-name">${this.escapeHTML(item.name)}</div><div class="expense-meta">${this.escapeHTML(item.category)} · ${this.escapeHTML(item.date)}</div></div><div class="expense-right"><div class="expense-amount">${this.money(item.amount)}</div><div class="row-actions"><button class="btn btn-small btn-secondary" type="button" data-action="edit" data-id="${this.escapeHTML(item.id)}">Edit</button><button class="btn btn-small btn-danger" type="button" data-action="delete" data-id="${this.escapeHTML(item.id)}">Delete</button></div></div></div>`).join('') : '<div class="empty">No expenses yet. Add your first one above.</div>'}</div></div>`;
  }
  // Form DOM changes belong in the View, not in the controller.
  restoreForm(data) {
    const form = this.parentElement.querySelector('#expense-form');
    form.elements.name.value = data.name;
    form.elements.amount.value = data.amount;
    form.elements.category.value = data.category;
  }
  focusName() {
    this.parentElement.querySelector('#expense-name').focus();
  }
  addHandlerSubmit(handler) {
    this.parentElement.querySelector('#expense-form').addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      handler(this.editId, {name:form.elements.name.value, amount:form.elements.amount.value, category:form.elements.category.value});
    });
  }
  addHandlerActions(onEdit, onDelete, onCancel) {
    this.parentElement.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
      if (button.dataset.action === 'edit') onEdit(button.dataset.id);
      else onDelete(button.dataset.id);
    }));
    this.parentElement.querySelector('#cancel-edit')?.addEventListener('click', onCancel);
  }
}
export default new ExpenseView();
