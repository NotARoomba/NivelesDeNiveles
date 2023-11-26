import {Link} from 'react-scroll';


export default function Advice() {
  return (
    <div id="advice" className="text-black">
      
      <div className=" bg-light-600 mx-auto my-auto justify-center flex-col lg:flex lg:flex-row-reverse h-screen py-32 px-2 lg:p-52">
        <div className="justify-center lg:justify-start my-auto mx-auto lg:mr-auto ">
        <img
            src="/img/logo.png"
            className="h-48 sm:h-80 z-10 animate animate-slowBounce mx-auto"
          />
        </div>
        <div className="justify-center mt-12 lg:my-auto align-middle mr-0 w-full text-center lg:text-start lg:w-6/12 mx-auto">
          <p className="text-5xl text-dark font-bold mb-8">Guía de Prevención</p>
          <Link
            className="text-lg bg-accent-500 text-dark hover:bg-dark hover:text-light hover:cursor-pointer transition-all duration-300 p-3 px-5 rounded mt-32"
            to="about"
            spy={true}
            smooth={true}
            duration={500}>
            Conóce la Guía
          </Link>
        </div>
      </div>
    </div>
  );
}
