// Calendar helpers: generate standard .ics downloads and Google Calendar links

export function downloadWeddingIcs() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ankit and Palak//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:ankit-palak-wedding-20261120@invitation.local',
    'DTSTAMP:20261028T000000Z',
    'DTSTART;TZID=Asia/Kolkata:20261120T170000',
    'DTEND;TZID=Asia/Kolkata:20261120T233000',
    'SUMMARY:Ankit & Palak Wedding Celebration',
    'LOCATION:Hotel Grand Xenia, Foy Sagar Road, Hathi Khera, Ajmer, Rajasthan 305001',
    'DESCRIPTION:Wedding celebration of Ankit & Palak. Join us for an evening of joy, love, and sacred celebrations in Ajmer!',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Ankit-Palak-Wedding.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadEventIcs(event) {
  const eventId = `ankit-palak-${event.id}@invitation.local`;
  const startDateStr = event.dayGroup === 'day1' ? '20261119' : '20261120';
  
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ankit and Palak//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${eventId}`,
    'DTSTAMP:20261028T000000Z',
    `DTSTART;TZID=Asia/Kolkata:${startDateStr}T100000`,
    `DTEND;TZID=Asia/Kolkata:${startDateStr}T140000`,
    `SUMMARY:Ankit & Palak - ${event.name}`,
    `LOCATION:${event.venue}`,
    `DESCRIPTION:${event.desc} - Ankit & Palak Wedding Festivities`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Ankit-Palak-${event.name.replace(/\s+/g, '-')}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarLink(event) {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const title = encodeURIComponent(event ? `Ankit & Palak - ${event.name}` : `Ankit & Palak Wedding Celebration`);
  const details = encodeURIComponent(event ? `${event.desc} | Time: ${event.time}` : "Wedding celebration of Ankit & Palak in Ajmer, Rajasthan.");
  const location = encodeURIComponent(event ? event.venue : "Hotel Grand Xenia, Foy Sagar Road, Ajmer, Rajasthan");
  const dates = event && event.dayGroup === 'day1' 
    ? "20261119T030000Z/20261119T170000Z"
    : "20261120T113000Z/20261120T180000Z";
  
  return `${base}&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

