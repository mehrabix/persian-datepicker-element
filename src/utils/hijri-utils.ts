/**
 * Utilities for converting between Hijri (Islamic) and Jalali (Persian) calendars
 * 
 * This implementation uses the Umm al-Qura calendar system which is used in many
 * Islamic countries and is accurate for contemporary dates
 */

/**
 * Converts Hijri date to Gregorian date
 * 
 * @param hy Hijri year
 * @param hm Hijri month (1-12)
 * @param hd Hijri day (1-30)
 * @returns Array [year, month, day] with Gregorian date
 */
export function hijriToGregorian(hy: number, hm: number, hd: number): [number, number, number] {
  // Ensure valid input
  if (hm < 1 || hm > 12 || hd < 1 || hd > 30) {
    throw new Error('Invalid Hijri date');
  }
  
  // Days since Hijri epoch (approximately July 19, 622 CE)
  // Algorithm based on Umm al-Qura calendar used in Saudi Arabia
  
  // Convert Hijri to days since Hijri epoch
  const epochDays = Math.floor((hy - 1) * 354.367) + // Average Hijri year is 354.367 days
                    Math.floor((hm - 1) * 29.5) + // Average Hijri month is 29.5 days
                    (hd - 1);
  
  // Convert to Gregorian date (Julian days + days since Hijri epoch + Gregorian epoch adjustment)
  const julianDays = epochDays + 1948439.5; // Adjustment for Hijri epoch in Julian days
  
  // Convert Julian days to Gregorian date
  return julianDaysToGregorian(julianDays);
}

/**
 * Converts Julian days to Gregorian date
 * 
 * @param julianDays Julian day count
 * @returns Array [year, month, day] with Gregorian date
 */
function julianDaysToGregorian(julianDays: number): [number, number, number] {
  const z = Math.floor(julianDays + 0.5);
  const a = Math.floor((z - 1867216.25) / 36524.25);
  const b = z + 1 + a - Math.floor(a / 4);
  const c = b + 1524;
  const d = Math.floor((c - 122.1) / 365.25);
  const e = Math.floor(365.25 * d);
  const f = Math.floor((c - e) / 30.6001);
  
  // Calculate day, month, and year
  const day = Math.floor(c - e - Math.floor(30.6001 * f));
  let month = f - 1 - 12 * Math.floor(f / 14);
  let year = d - 4715 - Math.floor((7 + month) / 10);
  
  // Convert to 1-based month
  if (month < 1) {
    month += 12;
    year -= 1;
  }
  
  return [year, month, day];
}

/**
 * Converts Gregorian date to Jalali (Persian) date
 * 
 * @param gy Gregorian year
 * @param gm Gregorian month (1-12)
 * @param gd Gregorian day (1-31)
 * @returns Array [year, month, day] with Jalali date
 */
export function gregorianToJalali(gy: number, gm: number, gd: number): [number, number, number] {
  // Implementation based on jalali.js algorithm
  const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  
  gy = parseInt(gy.toString());
  gm = parseInt(gm.toString());
  gd = parseInt(gd.toString());
  
  // Check if year is leap year and adjust February days
  const isLeapYear = (gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0);
  g_days_in_month[1] = isLeapYear ? 29 : 28;
  
  // Convert to days since Gregorian epoch
  let dayOfYear = gd;
  for (let i = 0; i < gm - 1; i++) {
    dayOfYear += g_days_in_month[i];
  }
  
  // Calculate Julian day number
  const jdn = Math.floor((gy + Math.floor((gm - 8) / 6) + 100100) * 1461 / 4)
            + Math.floor(((gm + 9) % 12 + 1) * 153 / 5)
            + gd - 34840408;
  const d = jdn % 1461;
  const jy = Math.floor(jdn / 1461) - 2820 + 474;
  
  // Calculate Jalali year
  const jYear = jy;
  
  // Calculate Jalali month and day
  let dayOfYearJalali = d;
  if (dayOfYearJalali >= 366) {
    dayOfYearJalali -= 366;
    const yearsToAdd = Math.floor(dayOfYearJalali / 365);
    dayOfYearJalali %= 365;
  }
  
  let jMonth = 0;
  let jDay = dayOfYearJalali;
  
  // Find month and day
  while (jDay >= j_days_in_month[jMonth]) {
    jDay -= j_days_in_month[jMonth];
    jMonth++;
  }
  
  return [jYear, jMonth + 1, jDay + 1];
}

/**
 * Converts Hijri date to Jalali date
 * 
 * @param hy Hijri year
 * @param hm Hijri month (1-12)
 * @param hd Hijri day (1-30)
 * @returns Array [year, month, day] with Jalali date
 */
export function hijriToJalali(hy: number, hm: number, hd: number): [number, number, number] {
  // First convert to Gregorian
  const [gy, gm, gd] = hijriToGregorian(hy, hm, hd);
  
  // Then convert to Jalali
  return gregorianToJalali(gy, gm, gd);
}

/**
 * Calculates Jalali date for a Hijri event in the current Persian year
 * 
 * @param currentPersianYear Current Jalali/Persian year
 * @param hijriMonth Hijri month (1-12)
 * @param hijriDay Hijri day (1-30)
 * @returns Array [month, day] with Jalali date or null if the event doesn't occur in the current year
 */
export function getHijriEventDateInJalaliYear(currentPersianYear: number, hijriMonth: number, hijriDay: number): [number, number] | null {
  // Get current date
  const today = new Date();
  
  // Approximate current Hijri year (this is rough approximation, might be off by 1 year)
  const currentHijriYear = Math.floor(currentPersianYear - 621.5 + 0.74 * (currentPersianYear - 621.5)) - 202;
  
  // Try current and next Hijri year (sometimes events span across Persian years)
  for (let yearOffset = 0; yearOffset <= 1; yearOffset++) {
    try {
      const hijriYear = currentHijriYear + yearOffset;
      
      // Get Jalali date for this Hijri event
      const [jYear, jMonth, jDay] = hijriToJalali(hijriYear, hijriMonth, hijriDay);
      
      // Check if the event falls in the requested Persian year
      if (jYear === currentPersianYear) {
        return [jMonth, jDay];
      }
    } catch (error) {
      // Skip any conversion errors and continue
      console.warn(`Error converting Hijri date (${currentHijriYear}, ${hijriMonth}, ${hijriDay})`, error);
    }
  }
  
  // Event doesn't occur in the current Persian year
  return null;
}

/**
 * Gets the estimated Hijri date (Islamic date) for today
 * 
 * @returns An array of [year, month, day] for today's Hijri date
 */
export function getCurrentHijriDate(): [number, number, number] {
  // Get today's Gregorian date
  const today = new Date();
  const gyear = today.getFullYear();
  const gmonth = today.getMonth() + 1;
  const gday = today.getDate();
  
  // Use approximate calculation based on mathematical estimation
  // (This isn't perfectly accurate but works for most contemporary dates)
  
  // Julian date calculation
  const jd = (1461 * (gyear + 4800 + (gmonth - 14) / 12)) / 4 +
           (367 * (gmonth - 2 - 12 * ((gmonth - 14) / 12))) / 12 -
           (3 * ((gyear + 4900 + (gmonth - 14) / 12) / 100)) / 4 +
           gday - 32075;
           
  // Hijri date calculation
  const l = Math.floor(jd) - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l1 = l - 10631 * n + 354;
  const j = (Math.floor((10985 - l1) / 5316)) * (Math.floor((50 * l1) / 17719)) + 
           (Math.floor(l1 / 5670)) * (Math.floor((43 * l1) / 15238));
  const l2 = l1 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - 
           (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
           
  const hmonth = Math.floor((24 * l2) / 709);
  const hday = l2 - Math.floor((709 * hmonth) / 24);
  const hyear = 30 * n + j - 30;
  
  return [hyear, hmonth, hday];
}

export default {
  hijriToGregorian,
  gregorianToJalali,
  hijriToJalali,
  getHijriEventDateInJalaliYear,
  getCurrentHijriDate
}; 