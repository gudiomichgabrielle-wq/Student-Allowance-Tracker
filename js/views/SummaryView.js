import View from './View.js';
class SummaryView extends View {
  constructor() {super('#summary-section');}
  _generateMarkup(data) {
    return `<div class="summary-grid"><div class="card"><div class="stat-label">Total allowance</div><div class="stat-value">${this.money(data.allowance)}</div><div class="stat-sub">Your starting budget</div></div><div class="card"><div class="stat-label">Total spent</div><div class="stat-value">${this.money(data.spent)}</div><div class="stat-sub">Across ${data.count} expense${data.count === 1 ? '' : 's'}</div></div><div class="card highlight"><div class="stat-label">Remaining balance</div><div class="stat-value ${data.remaining < 0 ? 'negative' : ''}">${this.money(data.remaining)}</div><div class="stat-sub">${data.remaining < 0 ? 'Over budget' : 'Available to spend'}</div><div class="progress"><div class="progress-fill" style="width:${data.percentage}%"></div></div></div></div>`;
  }
}
export default new SummaryView();
