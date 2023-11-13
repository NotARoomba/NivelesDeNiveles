import {Link} from 'react-router-dom';
import SmartBanner from 'react-smartbanner';
import 'react-smartbanner/dist/main.css';

export default function Error() {
  return (
    <div className="flex  flex-col h-[100vh] w-screen overflow-y-hidden bg-light gap-12 my-auto ">
      <SmartBanner
        title={'Niveles De Niveles'}
        daysHidden={0}
        daysReminder={0}
      />
      <p className="text-center w-full text-9xl text-dark font-bold my-auto mb-0 font-sans">
        404
      </p>
      <Link
        to="/"
        className="text-lg justify-center font-semibold mx-auto my-auto mt-12 bg-accent-500 text-dark hover:bg-dark hover:text-light hover:cursor-pointer transition-all duration-300 p-3 px-5 rounded">
        Inicio
      </Link>
    </div>
  );
}
