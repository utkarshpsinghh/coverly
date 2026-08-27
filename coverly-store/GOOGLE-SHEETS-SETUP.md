# Google Sheets order capture

1. Create a Google Sheet and open **Extensions → Apps Script**.
2. Replace the starter code with the contents of `google-apps-script/Code.gs`.
3. If the project is standalone, paste the Sheet ID from its URL into `SPREADSHEET_ID` in `Code.gs`.
4. Deploy → **New deployment** → **Web app**. Set “Execute as” to **Me** and access to **Anyone**. Copy the Web app URL.
5. Open `google-sheets-config.js` and paste that URL into `window.coverlyOrderWebhook`.
6. After every Apps Script edit, use **Deploy → Manage deployments → Edit → New version → Deploy**.
7. Publish the updated `outputs/coverly-store` folder. Test with a small order and confirm a new row appears in the `Orders` tab.

The sheet records the order ID, customer delivery details, payment method/status, total and every item in the bag. The site sends the row when the customer clicks “Open UPI app”; it does not collect UPI PINs, card details or OTPs.

## Google Form fallback

If the webhook is unavailable, create a Form with questions for Order ID, Name, Phone, Email, Address, City, State, Pincode, Items and Total. Get the form's `entry.xxxxx` IDs, then set them in `google-sheets-config.js`:

```js
window.coverlyGoogleForm = {
  action: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse',
  fields: { orderId: 'entry.111', name: 'entry.222', phone: 'entry.333', email: 'entry.444', address: 'entry.555', city: 'entry.666', state: 'entry.777', pincode: 'entry.888', items: 'entry.999', total: 'entry.000' }
};
```

Replace the sample IDs with your own. Checkout submits to both configured destinations and then opens UPI in the same tap.
