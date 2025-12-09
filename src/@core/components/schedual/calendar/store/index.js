// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Getadmincalndr } from '../../../../service/api/calender/Getcalneder'

export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async () => {
  const response = await Getadmincalndr()

  const events = response.data.map(e => {
    // ساخت تاریخ شروع
    const start = new Date(e.startDate)
    const [sh, sm] = e.startTime.split(':')
    start.setHours(Number(sh), Number(sm), 0, 0)

    // ساخت تاریخ پایان
    const end = new Date(e.startDate)
    const [eh, em] = e.endTime.split(':')
    end.setHours(Number(eh), Number(em), 0, 0)

    return {
      id: e.id,
      title: `Group ${e.courseGroupId.substring(0, 6)}`,
      start: start.toISOString(),
      end: end.toISOString(),
      extendedProps: { ...e, calendar: 'Business' }
    }
  })

  return events
})

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    events: [],
    selectedEvent: {}
  },
  reducers: {
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload
    })
  }
})

export const { selectEvent } = appCalendarSlice.actions

export default appCalendarSlice.reducer
