import { Row, Col } from "reactstrap"
import UserStatsCard from "../@core/dashboard/UserStatsCard.jsx"
import PaymentCard from "../@core/dashboard/PaymentCard.jsx"
import ReservationChart from "../@core/dashboard/ReservationChart.jsx"
import TechnologyChart from "../@core/dashboard/TechnologyChart.jsx"
import { useSkin } from '@hooks/useSkin'
import { useEffect } from "react"
import { GetDashboardReport, GetDashboardTechnologyReport } from "../@core/service/api/Dashboard/GetApi.js"

const Home = () => {
  const { colors } = useSkin()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await GetDashboardReport()
        await GetDashboardTechnologyReport()
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="dashboard-wrapper py-6 max-w-7xl mx-auto bg-gray-900 min-h-screen">
      
      <Row className="mb-6">
        <Col sm="12">
          <PaymentCard 
            colors={{ primary: '#7367f0' }} 
            message="تبریک! پرداخت‌ها با موفقیت ثبت شدند 🎉"
          />
        </Col>
      </Row>

      <Row className="mb-6">
        <Col md="6" sm="12" className="h-full">
          <UserStatsCard colors={colors}/>
        </Col>
        <Col md="6" sm="12" className="h-full">
          <ReservationChart colors={colors}/>
        </Col>
      </Row>

      <Row>
        <Col sm="12">
          <TechnologyChart colors={colors}/>
        </Col>
      </Row>
    </div>
  )
}

export default Home
