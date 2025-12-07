import { useEffect, useState, useContext } from 'react'
import Chart from 'react-apexcharts'
import { Card, CardBody, CardTitle } from 'reactstrap'
import { GetDashboardReport } from '../service/api/Dashboard/GetApi.js'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { useSkin } from '@hooks/useSkin'

const ReservationChart = ({ colors: propColors }) => {
  const { skin } = useSkin() || {}
  const theme = useContext(ThemeColors) || {}
  const themeColors = theme.colors || {}
  const isDark = skin === 'dark'
  const colors = propColors || themeColors || { primary: { main: '#7367f0' }, warning: { main: '#ff9f43' } }

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      try {
        const res = await GetDashboardReport()
        if (mounted && res) setData(res)
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchData()
    return () => { mounted = false }
  }, [])

  if (loading) return (
    <Card className="shadow-lg rounded-lg border-0" style={{ minHeight: 500, background: isDark ? '#1f1f2b' : '#fff' }}>
      <CardBody className="text-center p-4" style={{ color: isDark ? '#fff' : '#000', fontSize: '1.15rem' }}>
        در حال بارگذاری...
      </CardBody>
    </Card>
  )

  if (!data) return (
    <Card className="shadow-lg rounded-lg border-0" style={{ minHeight: 500, background: isDark ? '#1f1f2b' : '#fff' }}>
      <CardBody className="text-center p-4" style={{ color: isDark ? '#fff' : '#000', fontSize: '1.15rem' }}>
        داده‌ای موجود نیست
      </CardBody>
    </Card>
  )

  const series = [data.reserveAcceptPercent, data.reserveNotAcceptPercent]
  const labels = ['تأیید شده', 'تأیید نشده']

  const options = {
    labels,
    colors: [colors.primary?.main || '#7367f0', colors.warning?.main || '#ff9f43'],
    legend: {
      show: true,
      position: 'bottom',
      labels: { colors: isDark ? '#fff' : '#000', useSeriesColors: true },
      markers: { radius: 8, width: 16, height: 16, fillColors: [colors.primary?.main, colors.warning?.main] }
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => `${opts.w.globals.labels[opts.seriesIndex]}: ${val}%`,
      style: { colors: [isDark ? '#fff' : '#000'], fontSize: '14px', fontWeight: '700' }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%'
        }
      }
    },
    chart: { background: 'transparent' }
  }

  return (
    <Card className="shadow-lg rounded-lg border-0" style={{ minHeight: 500, background: isDark ? '#1f1f2b' : '#fff' }}>
      <CardBody className="text-center p-4" style={{ color: isDark ? '#fff' : '#000' }}>
        <CardTitle tag='h4' className="mb-3 fw-bold" style={{ fontSize: '1.4rem' }}>وضعیت رزروها</CardTitle>
        <Chart options={options} series={series} type='donut' height={400} />
      </CardBody>
    </Card>
  )
}

export default ReservationChart