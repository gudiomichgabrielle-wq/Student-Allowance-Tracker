import View from './View.js';
class AllowanceView extends View {
  constructor() {super('#allowance-section'); this.error = ''; this.message = '';}
  _generateMarkup(data) {
    return `<div class="card"><h2 class="section-title">Set your allowance</h2><p class="section-desc">Enter the amount available for your budget.</p><form id="allowance-form" novalidate><div class="field"><label for="allowance-input">Allowance amount (₱)</label><input id="allowance-input" name="allowance" type="number" min="0" step="0.01" value="${this.escapeHTML(data.allowance)}" required></div>${this.error ? `<p class="error" role="alert">${this.escapeHTML(this.error)}</p>` : ''}<button class="btn btn-full" type="submit">Save allowance</button>${this.message ? `<p class="success">${this.escapeHTML(this.message)}</p>` : ''}</form></div>`;
  }
  addHandlerSave(handler) {
    this.parentElement.querySelector('#allowance-form').addEventListener('submit', event => {
      event.preventDefault();
      handler(this.parentElement.querySelector('#allowance-input').value);
    });
  }
}
export default new AllowanceView();
