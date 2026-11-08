<<<<<<< HEAD
# Student Allowance Tracker (PocketPlan)

A vanilla JavaScript single-page app built using the Model–View–Controller pattern and a reusable base View class.

## Run locally

Use VS Code Live Server or run `python -m http.server 8000` in this folder, then open http://localhost:8000. Opening index.html with `file://` may block ES modules.

## Features

- Set a nonnegative allowance.
- Add, edit, and delete named expenses with positive amounts and categories.
- Automatically compute total spending, remaining balance, and spending percentage.
- Show validation errors inside the relevant view.
- Save data in browser localStorage across reloads.

## MVC roles

- `js/model.js`: one exported `state`, validation, calculations, localStorage; no DOM access.
- `js/views/View.js`: reusable base class providing `render`, `_generateMarkup`, HTML escaping, currency formatting.
- `js/views/AllowanceView.js`: allowance form and submit handler.
- `js/views/ExpenseView.js`: expense form/list and add/edit/delete handlers.
- `js/views/SummaryView.js`: summary cards and spending bar.
- `js/controller.js`: connects view events to model functions and re-renders.

**Important:** The included View.js is NOT verified as your instructor's exact Week 5 base class. Compare the included `View.js` with the actual Week 5 base View class from your instructor and adapt if required. Do not claim it is the instructor's exact source without checking.

## GitHub Pages

Create a GitHub repository, add each member as a collaborator, commit your own changes, push to the main branch, and in Settings > Pages choose Deploy from a branch > main > /(root). Wait for the Pages URL to become available. Verify it works and data persists after refresh.

## Course submission

The assignment asks for at least five meaningful commits per member, a 5–8 minute video where every member explains their own code, a live GitHub Pages link, repository link, and written PDF documentation. Disclose any AI assistance in Section 11. The included report is a **draft**, not evidence of tests or individual work.

## Before submission — course checklist

- [ ] Compare and adapt `js/views/View.js` to the original Week 5 base View class (ask instructor if you cannot find it).
- [ ] Run the app in a browser using Live Server and test add/edit/delete, empty fields, invalid numbers, allowance changes, and reload persistence.
- [ ] Save 3–5 genuine screenshots, including a validation error.
- [ ] Fill in the PDF report with real group members, roles, testing outcomes, reflections, and AI disclosure. The existing PDF is a draft only.
- [ ] Let each member make **at least five meaningful commits** under their own GitHub login and explain their View and controller functions.
- [ ] Publish and test the GitHub Pages live URL.
- [ ] Record the 5–8 minute video with every member speaking and demonstrating their code.

## Suggested six manual tests

| Test | Action | Expected result |
| --- | --- | --- |
| 1 | Save allowance 1000 | Summary shows ₱1,000 allowance |
| 2 | Add Food expense 120 | List shows Food item; remaining balance decreases by 120 |
| 3 | Edit expense amount to 150 | Total updates by +30 |
| 4 | Delete expense | Item disappears and summary recalculates |
| 5 | Submit expense with no name | An error message appears and item is not added |
| 6 | Submit expense with amount -5 | An error message appears and item is not added |
| 7 | Reload browser | Previously saved allowance and expenses remain |

**Do not mark a test as passed until your group performs it.**
=======
# Student-Allowance-Tracker
>>>>>>> 9312c6b9126fa0a07ac0dc38c9a53293ae515924
