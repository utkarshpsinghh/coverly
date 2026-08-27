# Google Sheets order capture

1. Create a Google Sheet and open **Extensions → Apps Script**.
2. Replace the starter code with the contents of `google-apps-script/Code.gs`.
3. Deploy → **New deployment** → **Web app**. Set “Execute as” to **Me** and access to **Anyone**. Copy the Web app URL.
4. Open `google-sheets-config.js` and paste that URL into `window.coverlyOrderWebhook`.
5. Publish the updated `outputs/coverly-store` folder. Test with a small order and confirm a new row appears in the `Orders` tab.

The sheet records the order ID, customer delivery details, payment method/status, total and every item in the bag. The site sends the row when the customer clicks “Open UPI app”; it does not collect UPI PINs, card details or OTPs.

For a Google Form workflow, keep the Form as a support/intake form if desired. Orders should use this webhook because it preserves the complete cart in one row and avoids asking customers to enter their delivery details twice.
