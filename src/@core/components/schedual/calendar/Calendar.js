import { useEffect, useRef, memo } from 'react'
import '@fullcalendar/react/dist/vdom'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import toast from 'react-hot-toast'
import { Menu } from 'react-feather'
import { Card, CardBody } from 'reactstrap'

const Calendar = ({
  events = [],
  isRtl = false,
  calendarsColor = {},
  calendarApi,
  setCalendarApi,
  handleAddEventSidebar,
  toggleSidebar,
  onSelectEvent,
  onUpdateEvent,
  blankEvent
}) => {
  const calendarRef = useRef(null)

  useEffect(() => {
    if (!calendarApi && calendarRef.current) {
      setCalendarApi(calendarRef.current.getApi())
    }
  }, [calendarApi])

  const calendarOptions = {
    events: events || [],
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    editable: true,
    eventResizableFromStart: true,
    dragScroll: true,
    dayMaxEvents: 2,
    navLinks: true,
    eventClassNames({ event: calendarEvent }) {
      const colorName = calendarsColor[calendarEvent.extendedProps?.calendar]
      return [`bg-light-${colorName}`]
    },
    // eventClick({ event: clickedEvent }) {
    //   if (onSelectEvent) onSelectEvent(clickedEvent)
    //   handleAddEventSidebar()
    // },
    customButtons: {
      sidebarToggle: {
        text: <Menu className='d-xl-none d-block' />,
        click() {
          toggleSidebar(true)
        }
      }
    },
    dateClick(info) {
      if (!blankEvent) return
      const ev = { ...blankEvent, start: info.date, end: info.date }
      if (onSelectEvent) onSelectEvent(ev)
      handleAddEventSidebar()
    },
    eventDrop({ event: droppedEvent }) {
      if (onUpdateEvent) onUpdateEvent(droppedEvent)
      toast.success('Event Updated')
    },
    eventResize({ event: resizedEvent }) {
      if (onUpdateEvent) onUpdateEvent(resizedEvent)
      toast.success('Event Updated')
    },
    ref: calendarRef,
    direction: isRtl ? 'rtl' : 'ltr'
  }

  return (
    <Card className='shadow-none border-0 mb-0 rounded-0'>
      <CardBody className='pb-0'>
        <FullCalendar {...calendarOptions} />
      </CardBody>
    </Card>
  )
}

export default memo(Calendar)
