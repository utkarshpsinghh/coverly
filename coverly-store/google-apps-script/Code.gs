const SHEET_NAME = 'Orders';
// For a standalone Apps Script project, paste the destination Sheet ID here.
// Leave blank when this script is bound to the spreadsheet itself.
const SPREADSHEET_ID = '1vFyERjcp02kqyxLi4GNxpLftu8WXHXpuy1m_y3wVIrM';

function getOrdersSpreadsheet() {
  const ss = SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('No spreadsheet found. Bind this script to your Sheet or set SPREADSHEET_ID.');
  return ss;
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, service: 'Coverly order capture' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) || (e && e.parameter && e.parameter.payload) || '{}';
    const payload = typeof raw === 'string' ? JSON.parse(raw) : raw;
    const ss = getOrdersSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    const headers = ['Received at','Order ID','Name','Phone','Email','Address','City','State','Pincode','Payment method','Payment status','Total (INR)','Items'];
    if (sheet.getLastRow() === 0) sheet.appendRow(headers);
    const orderId = payload.orderId || '';
    if (orderId && sheet.getLastRow() > 1 && sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues().flat().includes(orderId)) {
      return ContentService.createTextOutput(JSON.stringify({ok:true,duplicate:true})).setMimeType(ContentService.MimeType.JSON);
    }
    const items = Array.isArray(payload.items) ? payload.items : [];
    const itemText = items.map(item => `${item.title} | ${item.model} | ${item.colour} | qty ${item.quantity} | ₹${item.unitPrice}`).join(' ; ');
    sheet.appendRow([
      new Date(), orderId, payload.customer?.name || '', payload.customer?.phone || '',
      payload.customer?.email || '', payload.customer?.address || '', payload.customer?.city || '',
      payload.customer?.state || '', payload.customer?.pincode || '', payload.paymentMethod || 'UPI QR',
      payload.paymentStatus || 'Payment initiated', Number(payload.total || 0), itemText
    ]);
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(error)})).setMimeType(ContentService.MimeType.JSON);
  }
}
