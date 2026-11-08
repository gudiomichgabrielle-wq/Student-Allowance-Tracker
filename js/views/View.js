// Base View for the MVC project. Replace with your instructor's Week 5 base if its API differs.
export default class View {
  constructor(selector) {
    this.parentElement = document.querySelector(selector);
    if (!this.parentElement) throw new Error(`Missing container: ${selector}`);
  }
  render(data) {
    this.parentElement.innerHTML = this._generateMarkup(data);
  }
  _generateMarkup() {
    throw new Error('Child view must implement _generateMarkup().');
  }
  escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  }
  money(value) {
    return new Intl.NumberFormat('en-PH', {style:'currency',currency:'PHP'}).format(value);
  }
}
