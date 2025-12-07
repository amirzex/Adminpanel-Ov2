import { useEffect, useState, useContext } from 'react'
import Chart from 'react-apexcharts'
import { Card, CardBody, CardTitle } from 'reactstrap'
import { GetDashboardReport } from '../service/api/Dashboard/GetApi.js'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { useSkin } from '@hooks/useSkin'

const UserStatsCard = ({ colors: propColors }) => {
  const { skin } = useSkin() || {}
  const theme = useContext(ThemeColors) || {}
  const themeColors = theme.colors || {}
  const isDark = skin === 'dark'
  const colors = propColors || themeColors || { primary: { main: '#7367f0' }, warning: { main: '#ff9f43' } }

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetch = async () => {
      try {
        const res = await GetDashboardReport()
        if (mounted && res) setData(res)
        else if (mounted) setError('داده‌ای بازنگردانده شد')
      } catch (err) {
        console.error(err)
        if (mounted) setError(err.message || 'خطا در دریافت داده')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetch()
    return () => { mounted = false }
  }, [])

  if (loading) return (
    <Card className="shadow-lg rounded-lg border-0" style={{ background: isDark ? '#1f1f2b' : '#fff' }}>
      <CardBody className="text-center text-dark p-4" style={{ color: isDark ? '#fff' : '#000' }}>در حال بارگذاری...</CardBody>
    </Card>
  )

  if (error || !data) return (
    <Card className="shadow-lg rounded-lg border-0" style={{ background: isDark ? '#1f1f2b' : '#fff' }}>
      <CardBody className="text-center text-dark p-4" style={{ color: isDark ? '#fff' : '#000' }}>{error || 'داده‌ای موجود نیست'}</CardBody>
    </Card>
  )

  const stats = [
    { title: 'کاربران فعال', value: data.activeUserPercent, color: colors.primary?.main || '#7367f0', bgColorLight: '#E9E7FF', bgColorDark: '#2b254d' },
    { title: 'کاربران تعاملی', value: data.interActiveUserPercent, color: colors.warning?.main || '#ff9f43', bgColorLight: '#FFF4E5', bgColorDark: '#3a2e1a' }
  ]

  return (
    <Card className="shadow-lg rounded-lg border-0" style={{ minHeight: 565, background: isDark ? '#1f1f2b' : '#fff' }}>
      <CardBody className="p-4" style={{ color: isDark ? '#fff' : '#000' }}>
        <CardTitle tag='h4' className="mb-4 fw-bold" style={{ fontSize: '1.6rem' }}>آمار کاربران</CardTitle>

        <div className="d-flex gap-3 flex-wrap justify-content-center">
          {stats.map(item => (
            <Card key={item.title} className="flex-fill shadow-sm text-center" style={{
              minWidth: 180,
              minHeight: 210,
              background: isDark ? item.bgColorDark : item.bgColorLight,
              borderRadius: 10,
              border: 'none'
            }}>
              <CardBody className="d-flex flex-column align-items-center justify-content-center">
                <div className="mb-2" style={{ fontSize: '1.05rem', fontWeight: 700, color: isDark ? '#fff' : '#000' }}>{item.title}</div>

                <Chart
                  options={{
                    chart: { sparkline: { enabled: true }, background: 'transparent' },
                    plotOptions: {
                      radialBar: {
                        hollow: { size: '50%' },
                        dataLabels: {
                          name: { show: false },
                          value: {
                            show: true,
                            fontSize: '20px',
                            color: isDark ? '#fff' : '#000',
                            fontWeight: 700,
                            formatter: val => `${val}%`
                          }
                        }
                      }
                    },
                    colors: [item.color]
                  }}
                  series={[item.value]}
                  type='radialBar'
                  height={120}
                  width={120}
                />
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="mt-4 text-center" style={{ color: isDark ? '#bdbdbd' : '#666' }}>
          کل کاربران: <strong style={{ color: isDark ? '#fff' : '#000' }}>{data.allUser}</strong> | ناقص: <strong style={{ color: isDark ? '#fff' : '#000' }}>{data.inCompeletUserCount}</strong>
        </div>
      </CardBody>
    </Card>
  )
}

export default UserStatsCard