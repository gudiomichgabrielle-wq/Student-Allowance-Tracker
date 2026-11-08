const STORAGE_KEY = 'student-allowance-tracker-v1';
const initialState = {allowance: 1000, expenses: []};
function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && Number.isFinite(stored.allowance) && Array.isArray(stored.expenses)) {
      return {allowance: stored.allowance, expenses: stored.expenses.filter(item => item && typeof item.id === 'string' && typeof item.name === 'string' && Number.isFinite(item.amount) && item.amount > 0)};
    }
  } catch (error) { console.warn('Could not load saved data:', error); }
  return {...initialState, expenses: []};
}
export const state = loadState();
function save() {localStorage.setItem(STORAGE_KEY, JSON.stringify(state));}
export function setAllowance(value) {
  const amount = Number(value);
  if (String(value).trim() === '' || !Number.isFinite(amount) || amount < 0) throw new Error('Enter a valid allowance of 0 or more.');
  state.allowance = amount;
  save();
}
export function addExpense({name, amount, category}) {
  const cleanName = String(name).trim();
  const cost = Number(amount);
  if (!cleanName || cleanName.length > 70) throw new Error('Enter an expense name (1–70 characters).');
  if (String(amount).trim() === '' || !Number.isFinite(cost) || cost <= 0) throw new Error('Expense amount must be greater than 0.');
  if (!['Food','Transport','School','Other'].includes(category)) throw new Error('Select a valid category.');
  state.expenses.unshift({id: crypto.randomUUID(), name: cleanName, amount: cost, category, date: new Date().toLocaleDateString('en-PH')});
  save();
}
export function editExpense(id, {name, amount, category}) {
  const item = state.expenses.find(expense => expense.id === id);
  if (!item) throw new Error('Expense not found.');
  const cleanName = String(name).trim();
  const cost = Number(amount);
  if (!cleanName || cleanName.length > 70) throw new Error('Enter an expense name (1–70 characters).');
  if (String(amount).trim() === '' || !Number.isFinite(cost) || cost <= 0) throw new Error('Expense amount must be greater than 0.');
  if (!['Food','Transport','School','Other'].includes(category)) throw new Error('Select a valid category.');
  Object.assign(item, {name:cleanName, amount:cost, category});
  save();
}
export function deleteExpense(id) {
  state.expenses = state.expenses.filter(item => item.id !== id);
  save();
}
export function getSummary() {
  const spent = state.expenses.reduce((sum, item) => sum + item.amount, 0);
  return {allowance: state.allowance, spent, remaining: state.allowance - spent, count: state.expenses.length, percentage: state.allowance > 0 ? Math.min(100, spent / state.allowance * 100) : (spent > 0 ? 100 : 0)};
}
