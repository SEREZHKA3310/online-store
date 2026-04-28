import { Outlet } from 'react-router';
import Header from '../../widgets/Header/Header';
import Footer from '../../widgets/Footer/Footer';

const Layout = () => {
  return (
    <div className="app_layout">
      <Header />
      <main className="main_content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout