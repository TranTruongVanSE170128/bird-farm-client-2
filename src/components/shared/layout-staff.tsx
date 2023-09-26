import { Navigate, Outlet } from 'react-router-dom'
import LeftSidebar from './left-side-bar'
import TopBar from './top-bar'
import BottomBar from './bottom-bar'
import { useAuthContext } from '@/contexts/auth-provider'
import { routes } from '@/constants/staffRoutes'

function LayoutStaff() {
  const { role } = useAuthContext()

  if (role && !(role === 'staff')) {
    return <Navigate to='/' />
  }

  return (
    <main className='relative'>
      <TopBar />
      <div className='flex'>
        <LeftSidebar routes={routes} role='staff' />
        <section className='flex min-h-screen flex-1 flex-col items-center bg-dark-1 px-4 pb-10 pt-28 max-md:pb-32 sm:px-8'>
          <div className='w-full max-w-7xl'>
            <Outlet />
          </div>
        </section>
      </div>

      <BottomBar routes={routes} role='staff' />
    </main>
  )
}

export default LayoutStaff
