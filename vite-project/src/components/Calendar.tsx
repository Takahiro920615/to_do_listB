import React, { FC } from 'react';
import FullCalendar from '@fullcalendar/react'; // どのpluginよりも先にimportする必要があります
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from 'react-router-dom';


export const DemoCalendar: FC = () => {
  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin]} // pluginsにdayGridPluginを設定する
          headerToolbar={{
            right: 'dayGridMonth,dayGridWeek',
          }}
          initialView="dayGridMonth" // 初期表示のモードを設定する
          events={'https://fullcalendar.io/api/demo-feeds/events.json'}
        />
      </div>
    </div>
  );
};