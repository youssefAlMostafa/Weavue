export function conditionCodeToIcon(code: number, isDay: number): string {
  const snowCodes = [1066, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264];
  const rainCodes = [1063, 1069, 1072, 1087, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276, 1279, 1282];

  if (isDay === 0) {
    if (snowCodes.includes(code)) return 'i-snow';
    if (rainCodes.includes(code)) return 'i-rain';
    if ([1006, 1009, 1030, 1135, 1147].includes(code)) return 'i-cloud';
    if (code === 1003) return 'i-pcloud';
    return 'i-moon';
  }
  if (code === 1000) return 'i-sun';
  if (code === 1003) return 'i-pcloud';
  if ([1006, 1009, 1030, 1135, 1147].includes(code)) return 'i-cloud';
  if (snowCodes.includes(code)) return 'i-snow';
  if (rainCodes.includes(code)) return 'i-rain';
  return 'i-sun';
}

export function conditionCodeToSkyClass(code: number, isDay: number): string {
  const rainCodes = [1063, 1069, 1072, 1087, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276, 1279, 1282];
  const snowCodes = [1066, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264];

  if (rainCodes.includes(code)) return 'rain';
  if (snowCodes.includes(code)) return 'snow';
  if (isDay === 0) return 'night';
  if ([1003, 1006, 1009, 1030, 1135, 1147].includes(code)) return 'overcast';
  return 'sky';
}

export function formatLocalTime(localtime: string): string {
  const timePart = localtime.split(' ')[1] ?? '00:00';
  const [hoursStr, minutesStr] = timePart.split(':');
  const hours = parseInt(hoursStr, 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `${h.toString().padStart(2, '0')}:${minutesStr} ${ampm}`;
}

export function formatCoords(lat: number, lon: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(2)}° ${latDir} · ${Math.abs(lon).toFixed(2)}° ${lonDir}`;
}

export function parseAstroTime(timeStr: string): number {
  // "05:42 AM" or "07:42 PM"
  const parts = timeStr.trim().split(/\s+/);
  const [h, m] = (parts[0] ?? '00:00').split(':').map(Number);
  const ampm = parts[1] ?? 'AM';
  let hours = h;
  if (ampm === 'PM' && h !== 12) hours += 12;
  if (ampm === 'AM' && h === 12) hours = 0;
  return hours * 60 + m;
}

export function daylightLeft(sunset: string): string {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const setMinutes = parseAstroTime(sunset);
  const diff = setMinutes - nowMinutes;
  if (diff <= 0) return '—';
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return `${h}h ${m}m`;
}

export function sunArcProgress(sunrise: string, sunset: string): number {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const riseMinutes = parseAstroTime(sunrise);
  const setMinutes = parseAstroTime(sunset);
  const t = (nowMinutes - riseMinutes) / (setMinutes - riseMinutes);
  return Math.max(0, Math.min(1, t));
}

export function sunArcDot(t: number): { x: number; y: number } {
  // Quadratic bezier: P0=(5,55), P1=(50,-10), P2=(95,55)
  const P0 = { x: 5, y: 55 };
  const P1 = { x: 50, y: -10 };
  const P2 = { x: 95, y: 55 };
  const x = (1 - t) * (1 - t) * P0.x + 2 * t * (1 - t) * P1.x + t * t * P2.x;
  const y = (1 - t) * (1 - t) * P0.y + 2 * t * (1 - t) * P1.y + t * t * P2.y;
  return { x, y };
}

export function minutesAgo(lastUpdated?: string): string {
  if (!lastUpdated) return 'just now';
  const now = new Date();
  const updated = new Date(lastUpdated.replace(' ', 'T'));
  const diff = Math.round((now.getTime() - updated.getTime()) / 60000);
  if (diff < 1) return 'just now';
  return `${diff}m ago`;
}

export function aqiLabel(index?: number): string {
  switch (index) {
    case 1: return 'good';
    case 2: return 'moderate';
    case 3: return 'unhealthy (sensitive)';
    case 4: return 'unhealthy';
    case 5: return 'very unhealthy';
    case 6: return 'hazardous';
    default: return '—';
  }
}

export function uvLabel(uv?: number): string {
  if (!uv) return 'low';
  if (uv <= 2) return 'low';
  if (uv <= 5) return 'moderate';
  if (uv <= 7) return 'high';
  if (uv <= 10) return 'very high';
  return 'extreme';
}

const WIND_DIR_DEGREES: Record<string, number> = {
  N: 0, NNE: 22.5, NE: 45, ENE: 67.5,
  E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
  S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
  W: 270, WNW: 292.5, NW: 315, NNW: 337.5,
};

export function windDirToDegrees(dir?: string): number {
  return WIND_DIR_DEGREES[dir ?? 'N'] ?? 0;
}

export function getTimezoneLabel(tzId?: string): string {
  if (!tzId) return '';
  try {
    const formatter = new Intl.DateTimeFormat('en', {
      timeZone: tzId,
      timeZoneName: 'shortOffset',
    });
    const parts = formatter.formatToParts(new Date());
    return parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
  } catch {
    return '';
  }
}
