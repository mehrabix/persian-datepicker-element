const fs = require('fs');
const path = require('path');

// Read the events.json file directly
const eventsPath = path.join(__dirname, 'src/data/persian-calendar-repo/PersianCalendar/data/events.json');

try {
  const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
  
  // Helper function to map events to our format
  function mapEvents() {
    let allEvents = [];
    
    // Process Persian Calendar events
    if (eventsData && Array.isArray(eventsData["Persian Calendar"])) {
      const persianEvents = eventsData["Persian Calendar"].map(event => ({
        title: event.title,
        month: event.month,
        day: event.day,
        type: event.type,
        holiday: event.holiday
      }));
      
      allEvents = [...persianEvents];
    }
    
    // Process Hijri Calendar events
    if (eventsData && Array.isArray(eventsData["Hijri Calendar"])) {
      const hijriEvents = eventsData["Hijri Calendar"].map(event => ({
        title: event.title,
        month: event.month,
        day: event.day,
        type: event.type,
        holiday: event.holiday
      }));
      
      allEvents = [...allEvents, ...hijriEvents];
    }
    
    return allEvents;
  }
  
  // Get all events
  const allEvents = mapEvents();
  
  // Get all holiday types
  const allTypes = new Set();
  allEvents.forEach(event => allTypes.add(event.type));
  const eventTypes = Array.from(allTypes);

  console.log('=== HOLIDAY TYPES TEST ===');
  console.log(`Available event types: ${eventTypes.join(', ')}`);
  
  // Get all holidays (events where holiday = true)
  const allHolidays = allEvents.filter(event => event.holiday === true);
  console.log(`\nTotal holidays (all types): ${allHolidays.length}`);
  
  // Helper function to filter events by type
  function getEventsByType(events, types) {
    if (!types || types.length === 0) return events;
    return events.filter(event => types.includes(event.type));
  }
  
  // Helper function to count holidays by month
  function countHolidaysByMonth(holidays) {
    const countByMonth = {};
    holidays.forEach(holiday => {
      countByMonth[holiday.month] = (countByMonth[holiday.month] || 0) + 1;
    });
    return countByMonth;
  }
  
  // Log all holidays by month
  const allHolidaysByMonth = countHolidaysByMonth(allHolidays);
  console.log('All holidays by month:');
  Object.keys(allHolidaysByMonth).sort((a, b) => a - b).forEach(month => {
    console.log(`  Month ${month}: ${allHolidaysByMonth[month]} holidays`);
  });
  
  // 3. Check each type individually
  console.log('\n=== INDIVIDUAL TYPE TESTS ===');
  
  // Iran holidays
  const iranHolidays = getEventsByType(allHolidays, ['Iran']);
  console.log(`\nIran holidays: ${iranHolidays.length}`);
  const iranHolidaysByMonth = countHolidaysByMonth(iranHolidays);
  console.log('Iran holidays by month:');
  Object.keys(iranHolidaysByMonth).sort((a, b) => a - b).forEach(month => {
    console.log(`  Month ${month}: ${iranHolidaysByMonth[month]} holidays`);
  });
  
  // Religious holidays
  const religiousHolidays = getEventsByType(allHolidays, ['Religious']);
  console.log(`\nReligious holidays: ${religiousHolidays.length}`);
  const religiousHolidaysByMonth = countHolidaysByMonth(religiousHolidays);
  console.log('Religious holidays by month:');
  Object.keys(religiousHolidaysByMonth).sort((a, b) => a - b).forEach(month => {
    console.log(`  Month ${month}: ${religiousHolidaysByMonth[month]} holidays`);
  });
  
  // Afghanistan holidays
  const afghanistanHolidays = getEventsByType(allHolidays, ['Afghanistan']);
  console.log(`\nAfghanistan holidays: ${afghanistanHolidays.length}`);
  const afghanistanHolidaysByMonth = countHolidaysByMonth(afghanistanHolidays);
  console.log('Afghanistan holidays by month:');
  Object.keys(afghanistanHolidaysByMonth).sort((a, b) => a - b).forEach(month => {
    console.log(`  Month ${month}: ${afghanistanHolidaysByMonth[month]} holidays`);
  });
  
  // 4. Combined types
  console.log('\n=== COMBINED TYPE TESTS ===');
  
  // Iran + Religious
  const iranReligiousHolidays = getEventsByType(allHolidays, ['Iran', 'Religious']);
  console.log(`Iran + Religious holidays: ${iranReligiousHolidays.length}`);
  
  // Iran + Afghanistan
  const iranAfghanistanHolidays = getEventsByType(allHolidays, ['Iran', 'Afghanistan']);
  console.log(`Iran + Afghanistan holidays: ${iranAfghanistanHolidays.length}`);
  
  // Religious + Afghanistan
  const religiousAfghanistanHolidays = getEventsByType(allHolidays, ['Religious', 'Afghanistan']);
  console.log(`Religious + Afghanistan holidays: ${religiousAfghanistanHolidays.length}`);
  
  // 5. Check detailed month/day information for Afghanistan holidays
  console.log('\n=== DETAILED AFGHANISTAN HOLIDAYS ===');
  console.log('Persian Calendar Afghanistan holidays:');
  const persianAfghanHolidays = eventsData["Persian Calendar"]
    .filter(event => event.type === "Afghanistan" && event.holiday === true);
    
  persianAfghanHolidays.forEach(holiday => {
    console.log(`Month: ${holiday.month}, Day: ${holiday.day}, Title: ${holiday.title}`);
  });
  
  console.log('\nHijri Calendar Afghanistan holidays:');
  const hijriAfghanHolidays = eventsData["Hijri Calendar"]
    .filter(event => event.type === "Afghanistan" && event.holiday === true);
    
  hijriAfghanHolidays.forEach(holiday => {
    console.log(`Month: ${holiday.month}, Day: ${holiday.day}, Title: ${holiday.title}`);
  });
  
  // 6. Check specific months and days
  console.log('\n=== CHECKING SPECIFIC DATES ===');
  
  function isHoliday(month, day, types) {
    return allHolidays.some(holiday => 
      holiday.month === month && 
      holiday.day === day && 
      (!types || types.includes(holiday.type))
    );
  }
  
  function getHolidayTitles(month, day, types) {
    return allHolidays
      .filter(holiday => 
        holiday.month === month && 
        holiday.day === day && 
        (!types || types.includes(holiday.type))
      )
      .map(holiday => holiday.title);
  }
  
  // Check a date with Iran holiday
  const iranHolidayDate = { month: 1, day: 1 }; // Nowruz
  console.log(`\nChecking date ${iranHolidayDate.month}/${iranHolidayDate.day}:`);
  console.log(`Is holiday (Iran type): ${isHoliday(iranHolidayDate.month, iranHolidayDate.day, ['Iran'])}`);
  console.log(`Holiday titles (Iran type): ${getHolidayTitles(iranHolidayDate.month, iranHolidayDate.day, ['Iran'])}`);
  
  // Check a date with Afghanistan holiday
  const afghanHolidayDate = { month: 5, day: 28 }; // Afghanistan Independence Day
  console.log(`\nChecking date ${afghanHolidayDate.month}/${afghanHolidayDate.day}:`);
  console.log(`Is holiday (Afghanistan type): ${isHoliday(afghanHolidayDate.month, afghanHolidayDate.day, ['Afghanistan'])}`);
  console.log(`Holiday titles (Afghanistan type): ${getHolidayTitles(afghanHolidayDate.month, afghanHolidayDate.day, ['Afghanistan'])}`);
  
  // Check a date with a Hijri Calendar Afghanistan holiday
  const afghanHijriHolidayDate = { month: 10, day: 1 }; // Eid al-Fitr
  console.log(`\nChecking date ${afghanHijriHolidayDate.month}/${afghanHijriHolidayDate.day}:`);
  console.log(`Is holiday (Afghanistan type): ${isHoliday(afghanHijriHolidayDate.month, afghanHijriHolidayDate.day, ['Afghanistan'])}`);
  console.log(`Holiday titles (Afghanistan type): ${getHolidayTitles(afghanHijriHolidayDate.month, afghanHijriHolidayDate.day, ['Afghanistan'])}`);
  
  // Count total holidays by type
  console.log('\n=== SUMMARY ===');
  console.log(`Total holidays (all types): ${allHolidays.length}`);
  console.log(`Iran holidays: ${iranHolidays.length}`);
  console.log(`Religious holidays: ${religiousHolidays.length}`);
  console.log(`Afghanistan holidays: ${afghanistanHolidays.length} (Persian: ${persianAfghanHolidays.length}, Hijri: ${hijriAfghanHolidays.length})`);
  
} catch (error) {
  console.error('Error:', error);
} 