import { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap'
import { GetDashboardReport } from '../service/api/Dashboard/GetApi.js'

const PaymentCard = ({ message }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetDashboardReport()
        if (res) setData(res)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const formatPrice = (price) => {
    try {
      const num = typeof price === 'bigint' ? Number(price) : Number(price)
      return new Intl.NumberFormat('fa-IR').format(num)
    } catch {
      return price
    }
  }

  const cardStyle = {
    color: '#fff',
    background: 'linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7))',
    position: 'relative',
    overflow: 'hidden'
  }

  const decoreLeftStyle = {
    position: 'absolute',
    left: 3,
    bottom: 30,
    width: '190px',
    height: '150px',
    backgroundImage: 'url("/src/@core/assets/images/elements/decore-left.png")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  }

  const decoreRightStyle = {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '190px',
    height: '150px',
    backgroundImage: 'url("/src/@core/assets/images/elements/decore-right.png")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  }

  // Loading State
  if (loading) return (
    <Card className="shadow-lg rounded-lg border-0" style={cardStyle}>
      <CardBody className="text-center p-5" style={{ fontSize: '1.2rem' }}>
        در حال بارگذاری...
      </CardBody>
      <div style={decoreLeftStyle}></div>
      <div style={decoreRightStyle}></div>
    </Card>
  )

  // No Data State
  if (!data) return (
    <Card className="shadow-lg rounded-lg border-0" style={cardStyle}>
      <CardBody className="text-center p-5" style={{ fontSize: '1.2rem' }}>
        داده‌ای موجود نیست
      </CardBody>
      <div style={decoreLeftStyle}></div>
      <div style={decoreRightStyle}></div>
    </Card>
  )

  return (
    <Card className="shadow-lg rounded-lg border-0" style={cardStyle}>
      <div style={decoreLeftStyle}></div>
      <div style={decoreRightStyle}></div>

      <CardHeader className="text-center border-0">
        <CardTitle tag="h4" className="mb-1" style={{ fontSize: '1.8rem', fontWeight: 'bold'}}>
          مجموع پرداخت‌ها
        </CardTitle>
        <CardText style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>آخرین وضعیت پرداخت</CardText>
      </CardHeader>

      <CardBody className="text-center">
        <h3 className="fw-bold mb-2" style={{ fontSize: '2rem' }}>
          {formatPrice(data.allPaymentCost)} <span style={{ fontSize: '1.5rem' }}>تومان</span>
        </h3>
        <CardText style={{ fontSize: '1.2rem' }}>{message}</CardText>
      </CardBody>
    </Card>
  )
}

export default PaymentCard