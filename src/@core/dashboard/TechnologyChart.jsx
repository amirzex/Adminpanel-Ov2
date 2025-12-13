import { useEffect, useState, useContext } from 'react'
import Chart from 'react-apexcharts'
import { Card, CardBody, CardTitle } from 'reactstrap'
import { GetDashboardTechnologyReport } from '../service/api/Dashboard/GetApi.js'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { useSkin } from '@hooks/useSkin'

const TechnologyChart = ({ colors: propColors }) => {
  const { skin } = useSkin() || {}
  const theme = useContext(ThemeColors) || {}
  const themeColors = theme.colors || {}
  const isDark = skin === 'dark'
  const colors = propColors || themeColors || { primary: { main: '#7367f0' } }

  const [techData, setTechData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      try {
        const res = await GetDashboardTechnologyReport()
        if (mounted && Array.isArray(res)) setTechData(res)
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
    <Card className="shadow-lg rounded-lg border-0" style={{ background: isDark ? '#1f1f2b' : '#fff' }}>
      <CardBody className="text-center p-4" style={{ color: isDark ? '#fff' : '#000' }}>در حال بارگذاری...</CardBody>
    </Card>
  )

  if (!techData || !techData.length) return (
    <Card className="shadow-lg rounded-lg border-0" style={{ background: isDark ? '#1f1f2b' : '#fff' }}>
      <CardBody className="text-center p-4" style={{ color: isDark ? '#fff' : '#000' }}>داده‌ای موجود نیست</CardBody>
    </Card>
  )

  const series = techData.map(t => t.countUsed)
  const categories = techData.map(t => t.techName)

  const options = {
    chart: { type: 'bar', toolbar: { show: false }, background: 'transparent' },
    colors: [colors.primary?.main || '#7367f0'],
    plotOptions: { bar: { horizontal: false, columnWidth: '50%' } },
    xaxis: {
      categories,
      labels: { rotate: -30, style: { colors: Array(categories.length).fill(isDark ? '#fff' : '#000'), fontSize: '12px' } },
      axisBorder: { color: isDark ? '#2c2c37' : '#e9e9e9' }
    },
    yaxis: { labels: { style: { colors: [isDark ? '#ddd' : '#666'] } } },
    dataLabels: { enabled: false },
    grid: { strokeDashArray: 6, borderColor: isDark ? '#2c2c37' : '#f1f1f1' }
  }

  return (
    <Card className="shadow-lg rounded-lg border-0" style={{ background: isDark ? '#1f1f2b' : '#fff' }}>
      <CardBody className="p-4" style={{ color: isDark ? '#fff' : '#000' }}>
        <CardTitle tag='h4' className="mb-3 fw-bold" style={{ fontSize: '1.25rem' }}>استفاده از تکنولوژی‌ها</CardTitle>
        <div className="overflow-auto">
          <div style={{ minWidth: 600 }}>
            <Chart options={options} series={[{ name: 'Usage', data: series }]} type='bar' height={350} />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default TechnologyChart