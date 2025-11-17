// ** React Imports
import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'

// ** Steps
import Address from './steps-with-validation/Address'
import SocialLinks from './steps-with-validation/SocialLinks'
import PersonalInfo from './steps-with-validation/PersonalInfo'
import AccountDetails from './steps-with-validation/AccountDetails'

const WizardHorizontal = () => {
  
  // ** Ref
  const ref = useRef(null)

  // ** State
  const [stepper, setStepper] = useState(null)

  const steps = [
    {
      id: 'account-details',
      title: 'جزئیات حساب',
      subtitle: 'جزئیات حساب خود را وارد کنید.',
      content: <AccountDetails stepper={stepper} />
    },
    {
      id: 'personal-info',
      title: 'اطلاعات شخصی',
      subtitle: 'اطلاعات شخصی را اضافه کنید',
      content: <PersonalInfo stepper={stepper} />
    },
    {
      id: 'step-address',
      title: 'آدرس',
      subtitle: 'افزودن آدرس',
      content: <Address stepper={stepper} />
    },
    {
      id: 'social-links',
      title: 'لینک‌های اجتماعی',
      subtitle: 'پیوندهای اجتماعی اضافه کنید',
      content: <SocialLinks stepper={stepper} />
    }
  ]

  return (
    <div className='horizontal-wizard'>
      <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} />
    </div>
  )
}

export default WizardHorizontal
