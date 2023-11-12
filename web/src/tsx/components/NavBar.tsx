import {useState} from 'react';

export default function NavBar() {
  const [menu, setMenu] = useState(true);
  return (
    <div className="flex w-screen shadow-lg drop-shadow-2xl z-50 h-[72px] bg-light  justify-around fixed">
      <div className="flex w-10/12 lg:w-8/12 justify-start ">
        <img src="/logo.png" className="h-12 align-middle my-auto" />
        <div className="flex w-1/2 justify-end items-center ">
          {/* <div
            className="flex xl:hidden group items-center flex-col w-16 aspect-square py-3 hover:bg-dark-900 dark:hover:bg-dark-500 rounded-lg mr-2 p-1 my-auto align-middle cursor-pointer transition-all "
            onClick={() => setMenu(!menu)}>
            <span
              className={
                'bg-dark dark:bg-dark-900 w-10 block h-1 rounded my-auto duration-300' +
                (menu ? ' -rotate-45 translate-y-[13px]' : ' rotate-0')
              }></span>
            <span
              className={
                ' w-10 block h-1 rounded my-auto duration-300' +
                (menu ? ' bg-transparent ' : ' bg-dark dark:bg-dark-900')
              }></span>
            <span
              className={
                'bg-dark dark:bg-dark-900 w-10 block h-1 rounded my-auto duration-300' +
                (menu ? ' rotate-45 -translate-y-[13px]' : ' rotate-0')
              }></span>
          </div> */}
        </div>
      </div>
      <div
        onClick={() => setMenu(false)}
        className={
          ' bg-white/80 dark:bg-dark-500/80 w-screen absolute h-fit top-20 justify-center transition duration-300 flex flex-wrap' +
          (menu ? ' animate-show' : ' animate-hide hidden')
        }></div>
    </div>
  );
}
