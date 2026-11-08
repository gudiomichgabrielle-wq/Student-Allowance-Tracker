import * as model from './model.js';
import allowanceView from './views/AllowanceView.js';
import expenseView from './views/ExpenseView.js';
import summaryView from './views/SummaryView.js';

// The controller alone connects model changes to view updates.
function renderAll() {
  allowanceView.render(model.state);
  expenseView.render(model.state.expenses);
  summaryView.render(model.getSummary());
  allowanceView.addHandlerSave(controlSaveAllowance);
  expenseView.addHandlerSubmit(controlSubmitExpense);
  expenseView.addHandlerActions(controlStartEdit, controlDeleteExpense, controlCancelEdit);
}
function controlSaveAllowance(value) {
  try {
    model.setAllowance(value);
    allowanceView.error = '';
    allowanceView.message = 'Allowance saved.';
  } catch (error) {
    allowanceView.error = error.message;
    allowanceView.message = '';
  }
  renderAll();
}
function controlSubmitExpense(id, data) {
  try {
    if (id) model.editExpense(id, data);
    else model.addExpense(data);
    expenseView.error = '';
    expenseView.editId = null;
    allowanceView.message = '';
  } catch (error) {
    expenseView.error = error.message;
  }
  renderAll();
  if (expenseView.error) {
    expenseView.restoreForm(data);
  }
}
function controlStartEdit(id) {
  expenseView.editId = id;
  expenseView.error = '';
  renderAll();
  expenseView.focusName();
}
function controlDeleteExpense(id) {
  model.deleteExpense(id);
  if (expenseView.editId === id) expenseView.editId = null;
  expenseView.error = '';
  renderAll();
}
function controlCancelEdit() {
  expenseView.editId = null;
  expenseView.error = '';
  renderAll();
}
renderAll();
