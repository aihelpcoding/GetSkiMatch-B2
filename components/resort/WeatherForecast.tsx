import { WeatherData } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { CloudSnow, Thermometer, Wind } from 'lucide-react';

interface WeatherForecastProps {
  weather: WeatherData | null;
}

export default function WeatherForecast({ weather }: WeatherForecastProps) {
  if (!weather?.forecast) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          <CloudSnow className="h-12 w-12 mx-auto mb-2" />
          <p>Forecast information is currently unavailable</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Weather Forecast</h2>
      <div className="space-y-4">
        {weather.forecast.map((day, index) => {
          const date = parseISO(day.date);
          return (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{format(date, 'EEE, MMM d')}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Thermometer className="h-4 w-4" />
                    <span>Temperature</span>
                  </div>
                  <p>{day.temperature.max}°C / {day.temperature.min}°C</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Wind className="h-4 w-4" />
                    <span>Wind</span>
                  </div>
                  <p>{day.wind.speed} m/s</p>
                </div>
                {day.conditions.snowAmount > 0 && (
                  <div className="col-span-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <CloudSnow className="h-4 w-4" />
                      <span>Snow</span>
                    </div>
                    <p>{day.conditions.snowAmount}mm expected</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
