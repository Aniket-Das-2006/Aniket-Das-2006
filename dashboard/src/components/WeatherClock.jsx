import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CloudSun, Compass, Wind, Droplets } from 'lucide-react';

const WeatherClock = () => {
  // Clocks
  const [localTime, setLocalTime] = useState(new Date());
  const [nyTime, setNyTime] = useState(new Date());
  const [londonTime, setLondonTime] = useState(new Date());
  const [tokyoTime, setTokyoTime] = useState(new Date());
  
  // Weather
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [errorWeather, setErrorWeather] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setLocalTime(d);
      
      // Convert to NY, London, Tokyo
      setNyTime(new Date(d.toLocaleString("en-US", { timeZone: "America/New_York" })));
      setLondonTime(new Date(d.toLocaleString("en-US", { timeZone: "Europe/London" })));
      setTokyoTime(new Date(d.toLocaleString("en-US", { timeZone: "Asia/Tokyo" })));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch real-time weather for Berhampore, West Bengal
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoadingWeather(true);
        // Latitude 24.0984, Longitude 88.2497 for Berhampore
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=24.0984&longitude=88.2497&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m"
        );
        if (!res.ok) throw new Error("Failed to fetch weather");
        const data = await res.json();
        setWeather(data.current);
        setLoadingWeather(false);
      } catch (err) {
        console.error(err);
        setErrorWeather(true);
        setLoadingWeather(false);
      }
    };

    fetchWeather();
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  // Weather descriptions based on WMO codes
  const getWeatherDesc = (code) => {
    if (code === 0) return "Clear Sky";
    if (code >= 1 && code <= 3) return "Partly Cloudy";
    if (code >= 45 && code <= 48) return "Foggy";
    if (code >= 51 && code <= 55) return "Drizzle";
    if (code >= 61 && code <= 65) return "Rainy";
    if (code >= 71 && code <= 77) return "Snowy";
    if (code >= 80 && code <= 82) return "Rain Showers";
    if (code >= 95 && code <= 99) return "Thunderstorm";
    return "Mild Conditions";
  };

  // Calendar parameters
  const now = new Date();
  const currentMonthName = now.toLocaleString('en-US', { month: 'long' });
  const currentYear = now.getFullYear();
  const daysInMonth = new Date(currentYear, now.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, now.getMonth(), 1).getDay(); // Day of week (0-6)
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayIndex }, (_, i) => i);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
      
      {/* ⏰ World Clocks Card */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', color: '#fff', marginBottom: '20px' }}>
          <Clock size={18} color="var(--accent-blue)" />
          World Clocks
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-lavender)', fontWeight: 'bold' }}>BENGAL, IN (LOCAL)</span>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--muted)' }}>Asia/Kolkata</span>
            </div>
            <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold', color: '#fff' }}>
              {localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>NEW YORK</span>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--muted)' }}>EST/EDT</span>
            </div>
            <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>
              {nyTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>LONDON</span>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--muted)' }}>GMT/BST</span>
            </div>
            <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>
              {londonTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>TOKYO</span>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--muted)' }}>JST</span>
            </div>
            <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>
              {tokyoTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
            </span>
          </div>

        </div>
      </div>

      {/* 🌤️ Global Weather System (Berhampore) */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', color: '#fff', marginBottom: '20px' }}>
          <CloudSun size={18} color="var(--accent-blue)" />
          Live Weather Station
        </h4>
        
        {loadingWeather && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '140px', fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            fetching atmospheric data...
          </div>
        )}

        {errorWeather && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '140px', fontSize: '0.8rem', color: '#ef4444', textAlign: 'center' }}>
            Failed to sync with Open-Meteo. Please check connection.
          </div>
        )}

        {!loadingWeather && !errorWeather && weather && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>BERHAMPORE, IN</span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--accent-lavender)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>
                  {getWeatherDesc(weather.weather_code)}
                </span>
              </div>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-space)' }} className="text-gradient">
                {Math.round(weather.temperature_2m)}°C
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '5px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Droplets size={16} color="var(--accent-indigo)" />
                <div>
                  <span style={{ display: 'block', fontSize: '0.62rem', color: 'var(--muted)', textTransform: 'uppercase' }}>Humidity</span>
                  <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>{weather.relative_humidity_2m}%</span>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Wind size={16} color="var(--accent-indigo)" />
                <div>
                  <span style={{ display: 'block', fontSize: '0.62rem', color: 'var(--muted)', textTransform: 'uppercase' }}>Wind</span>
                  <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>{weather.wind_speed_10m} km/h</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.7rem', color: 'var(--muted)', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '10px', marginTop: '5px' }}>
              Coordinates: 24.0984° N, 88.2497° E • Dynamic API Sync
            </div>
          </div>
        )}
      </div>

      {/* 📅 Interactive Calendar */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', color: '#fff', marginBottom: '15px' }}>
          <Calendar size={18} color="var(--accent-blue)" />
          Active Calendar
        </h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '0.85rem' }}>
          <span style={{ fontWeight: 'bold', color: 'var(--accent-lavender)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {currentMonthName} {currentYear}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            DAY {now.getDate()} OF {daysInMonth}
          </span>
        </div>

        {/* Calendar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <span key={i} style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--muted-dim)', padding: '4px 0' }}>{d}</span>
          ))}
          {emptyDays.map(i => (
            <div key={`empty-${i}`} />
          ))}
          {days.map(d => {
            const isToday = d === now.getDate();
            return (
              <div
                key={d}
                style={{
                  fontSize: '0.75rem',
                  padding: '6px 0',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  color: isToday ? '#fff' : '#94a3b8',
                  background: isToday ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-indigo))' : 'transparent',
                  border: isToday ? '1px solid var(--accent-lavender)' : '1px solid transparent',
                  boxShadow: isToday ? 'var(--glow-blue)' : 'none',
                  fontWeight: isToday ? 'bold' : 'normal'
                }}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default WeatherClock;
