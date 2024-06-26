import Sidebar from './Sidebar';
import MainHeader from './MainHeader';
import '../App.css';

const Journey = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <MainHeader />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div>🥴</div>
        </main>
      </div>
    </div>
  );
};

export default Journey;
