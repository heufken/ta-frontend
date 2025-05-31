import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen min-w-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6 space-y-6">
         <Outlet />
        </main>
      </div>
    </div>
  );
} 