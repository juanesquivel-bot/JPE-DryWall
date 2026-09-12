const NOTIFY_EMAIL = 'Juanesquivel@jpe-ventures.com';
const SHEET_TITLE = 'J&P Drywall - Bid Requests';
const TAB_NAME = 'Bids';
const ATTACHMENTS_FOLDER = 'J&P Drywall Bid Attachments';
const HEADERS = ['Timestamp', 'Name', 'Company', 'Phone', 'Email', 'Project Type', 'Scope', 'File Name', 'File Link'];

/**
 * Paste the ID of the Google Sheet you created, then push this script.
 * The ID is the long string in the sheet URL:
 * https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit
 *
 * Leave blank to use a bound spreadsheet (clasp create --type sheets)
 * or to auto-create a sheet on first submission.
 */
const USER_SPREADSHEET_ID = '1IKTUmFX_4E-xNEZWR_V1yR4gyZAuVXHziO_YIsJUBpc';

function doGet() {
  return json_({ ok: true, service: 'J&P Drywall Bid Requests' });
}

function doPost(e) {
  try {
    const data = parseBody_(e);
    const fullName = String(data.fullName || '').trim();
    const company = String(data.company || '').trim();
    const phone = String(data.phone || '').trim();
    const email = String(data.email || '').trim();
    const projectType = String(data.projectType || '').trim();
    const details = String(data.details || '').trim();
    const fileName = String(data.fileName || '').trim();
    const fileMime = String(data.fileMime || '').trim();
    const fileBase64 = String(data.fileBase64 || '').trim();

    if (!fullName || !company || !phone || !email || !projectType || !details) {
      return json_({ ok: false, error: 'Missing required fields' });
    }

    const attachment = saveAttachment_(fileName, fileMime, fileBase64);
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    appendIntake_([
      timestamp,
      fullName,
      company,
      phone,
      email,
      projectType,
      details,
      attachment.fileName,
      attachment.fileUrl,
    ]);
    sendNotice_(timestamp, fullName, company, phone, email, projectType, details, attachment);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function parseBody_(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      throw new Error('Could not read the bid request. If a file was attached, try a smaller PDF (under 8 MB).');
    }
  }
  return (e && e.parameter) || {};
}

function getSpreadsheet_() {
  if (USER_SPREADSHEET_ID) {
    return SpreadsheetApp.openById(USER_SPREADSHEET_ID);
  }

  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) {
      return active;
    }
  } catch (err) {
    // Standalone script — fall through to saved/created spreadsheet.
  }

  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty('SPREADSHEET_ID');

  if (existingId) {
    return SpreadsheetApp.openById(existingId);
  }

  const ss = SpreadsheetApp.create(SHEET_TITLE);
  props.setProperty('SPREADSHEET_ID', ss.getId());
  return ss;
}

function getAttachmentsFolder_() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty('ATTACHMENTS_FOLDER_ID');

  if (existingId) {
    try {
      return DriveApp.getFolderById(existingId);
    } catch (err) {
      // Folder was deleted — create a new one below.
    }
  }

  const matches = DriveApp.getFoldersByName(ATTACHMENTS_FOLDER);
  const folder = matches.hasNext() ? matches.next() : DriveApp.createFolder(ATTACHMENTS_FOLDER);
  props.setProperty('ATTACHMENTS_FOLDER_ID', folder.getId());
  return folder;
}

function saveAttachment_(fileName, fileMime, fileBase64) {
  if (!fileName || !fileBase64) {
    return { fileName: '', fileUrl: '' };
  }

  const decoded = Utilities.base64Decode(fileBase64);
  const blob = Utilities.newBlob(decoded, fileMime || 'application/octet-stream', fileName);
  const file = getAttachmentsFolder_().createFile(blob);

  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (err) {
    // Sharing can be blocked by account policy; the owner can still open the file URL.
  }

  return {
    fileName: file.getName(),
    fileUrl: file.getUrl(),
  };
}

function getIntakesSheet_() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(TAB_NAME);

  if (!sheet) {
    sheet = ss.getSheets()[0];
    sheet.setName(TAB_NAME);
  }

  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const needsHeaders = HEADERS.some(function (header, i) {
    return String(firstRow[i] || '') !== header;
  });

  if (needsHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function appendIntake_(row) {
  const sheet = getIntakesSheet_();
  sheet.appendRow(row);
}

function sendNotice_(timestamp, fullName, company, phone, email, projectType, details, attachment) {
  const subject = 'New commercial bid request from ' + fullName;
  const fileLine = attachment && attachment.fileUrl
    ? (attachment.fileName || 'Attachment') + '\n' + attachment.fileUrl
    : 'None';
  const body = [
    'A new bid request was submitted on the J&P Drywall website.',
    '',
    'Submitted: ' + timestamp,
    'Name: ' + fullName,
    'Company: ' + company,
    'Phone: ' + phone,
    'Email: ' + email,
    'Project Type: ' + projectType,
    '',
    'Blueprints / Specs:',
    fileLine,
    '',
    'Project Scope:',
    details,
  ].join('\n');

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: email,
    subject: subject,
    body: body,
  });
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
