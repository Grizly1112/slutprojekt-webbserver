import './css/Members.css'
import { Outlet } from 'react-router-dom'
import MembersSideBar from './components/MembersSideBar'

export default function Members() {
  return (
    <div className='members'>
      <MembersSideBar />
      <div className="memebers-container">
          <Outlet />
      </div>
    </div>
  )
}
