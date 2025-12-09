import { Fragment, useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import classnames from 'classnames'
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import AddEventSidebar from './AddEventSidebar'

import { Getadmincalndr } from '../../../service/api/calender/Getcalneder' // مسیر درست را بررسی کنید
import '@styles/react/apps/app-calendar.scss'

const calendarsColor = {
  Business: 'primary'
}

const CalendarComponent = () => {
  const [calendarApi, setCalendarApi] = useState(null)
  const [addSidebarOpen, setAddSidebarOpen] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [events, setEvents] = useState([]) // داده‌های تقویم
  const startDate = "2025-12-10T09:30:00.000Z"
  const endDate = "2025-12-10T11:00:00.000Z"
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await Getadmincalndr({startDate,endDate})

        const data = response || []
        console.log('Raw API data:', data)

        const events = data.map(item => ({
          id: item.id,
          title: item.title || `Course ${item.courseGroupId}`,
          start: `${item.startDate.split('T')[0]}T${item.startTime}:00`,
          end: `${(item.endDate || item.startDate).split('T')[0]}T${item.endTime || item.startTime}:00`,
        }))

        console.log('Mapped events for calendar:', events)
        setEvents(events)
      } catch (err) {
        console.log('Error fetching events:', err)
      }
    }

    fetchEvents()
  }, [])



  const toggleSidebar = val => setLeftSidebarOpen(val)
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

  const handleSelectEvent = event => {
    console.log('Selected Event:', event)
    // اینجا می‌توانید رفتار دلخواه انتخاب event را اضافه کنید
  }

  return (
    <Fragment>
      <div className='app-calendar overflow-hidden border'>
        <Row className='g-0'>
          {/* <Col
            id='app-calendar-sidebar'
            className={classnames('col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column', {
              show: leftSidebarOpen
            })}
          >
            <SidebarLeft toggleSidebar={toggleSidebar} />
          </Col> */}

          <Col className='position-relative'>
            <Calendar
              events={events} // به جای store
              calendarsColor={calendarsColor}
              selectEvent={handleSelectEvent} // به جای selectEvent از Redux
              calendarApi={calendarApi}
              setCalendarApi={setCalendarApi}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
        </Row>
      </div>

      <AddEventSidebar
        open={addSidebarOpen}
        events={events} // به جای store
        calendarApi={calendarApi}
        handleAddEventSidebar={handleAddEventSidebar}
      />
    </Fragment>
  )
}

export default CalendarComponent
