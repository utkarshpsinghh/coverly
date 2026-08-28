// Google Sheets order capture configuration.
// Paste your deployed Google Apps Script Web App URL between the quotes.
window.coverlyOrderWebhook = 'https://script.google.com/macros/s/AKfycbxFgHASxYrsy042ccMV2zA1mI-jnH1ZHkIHwLYtlLIhRe_ODPr-zRL_eajKfev48W0/exec';
// Optional Google Form fallback. Add the formResponse URL and entry IDs after creating the form.
// Example:
// window.coverlyGoogleForm = { action: 'https://docs.google.com/forms/d/e/FORM_ID/formResponse', fields: { orderId:'entry.1', name:'entry.2', phone:'entry.3', email:'entry.4', address:'entry.5', city:'entry.6', state:'entry.7', pincode:'entry.8', items:'entry.9', total:'entry.10' } };
window.coverlyGoogleForm = { action: '', fields: {} };
