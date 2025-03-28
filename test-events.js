const fs = require('fs');
const path = require('path');

// Read the events.json file directly
const eventsPath = path.join(
  __dirname,
  'src/data/persian-calendar-repo/PersianCalendar/data/events.json'
);

try {
  const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

  console.log('=== DIRECT EVENTS.JSON ACCESS ===');

  // Process Persian Calendar events
  if (eventsData && Array.isArray(eventsData['Persian Calendar'])) {
    const afghanEvents = eventsData['Persian Calendar'].filter(
      event => event.type === 'Afghanistan'
    );

    console.log(`Found ${afghanEvents.length} Afghanistan events in Persian Calendar section`);

    // Count holidays
    const holidays = afghanEvents.filter(event => event.holiday === true);
    console.log(`Afghanistan holidays: ${holidays.length}`);

    // Log holiday details
    console.log('\nAfghanistan holidays:');
    holidays.forEach(event => {
      console.log(`Month: ${event.month}, Day: ${event.day}, Title: ${event.title}`);
    });
  }

  // Process Hijri Calendar events
  if (eventsData && Array.isArray(eventsData['Hijri Calendar'])) {
    const afghanEvents = eventsData['Hijri Calendar'].filter(event => event.type === 'Afghanistan');

    console.log(`\nFound ${afghanEvents.length} Afghanistan events in Hijri Calendar section`);

    // Count holidays
    const holidays = afghanEvents.filter(event => event.holiday === true);
    console.log(`Afghanistan holidays (Hijri): ${holidays.length}`);

    // Log holiday details
    console.log('\nAfghanistan Hijri holidays:');
    holidays.forEach(event => {
      console.log(`Month: ${event.month}, Day: ${event.day}, Title: ${event.title}`);
    });
  }

  // Process any NT rule based events related to Afghanistan
  if (eventsData && Array.isArray(eventsData['nth weekday of month'])) {
    const afghanEvents = eventsData['nth weekday of month'].filter(
      event => event.type === 'Afghanistan'
    );

    console.log(
      `\nFound ${afghanEvents.length} Afghanistan events in nth weekday of month section`
    );
    console.log(afghanEvents);
  }
} catch (error) {
  console.error('Error reading events.json:', error);
}
