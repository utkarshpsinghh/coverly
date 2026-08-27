const SHEET_NAME = 'Orders';

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    const headers = ['Received at','Order ID','Name','Phone','Email','Address','City','State','Pincode','Payment method','Payment status','Total (INR)','Items'];
    if (sheet.getLastRow() === 0) sheet.appendRow(headers);
    const items = Array.isArray(payload.items) ? payload.items : [];
    const itemText = items.map(item => `${item.title} | ${item.model} | ${item.colour} | qty ${item.quantity} | ₹${item.unitPrice}`).join(' ; ');
    sheet.appendRow([
      new Date(), payload.orderId || '', payload.customer?.name || '', payload.customer?.phone || '',
      payload.customer?.email || '', payload.customer?.address || '', payload.customer?.city || '',
      payload.customer?.state || '', payload.customer?.pincode || '', payload.paymentMethod || 'UPI QR',
      payload.paymentStatus || 'Payment initiated', Number(payload.total || 0), itemText
    ]);
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(error)})).setMimeType(ContentService.MimeType.JSON);
  }
}
