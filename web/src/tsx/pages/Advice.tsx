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
          <p className="text-5xl text-dark font-bold mb-8">
            Guía de Prevención
          </p>
          <Link
            className="text-lg bg-accent-500 text-dark hover:bg-dark hover:text-light hover:cursor-pointer transition-all duration-300 p-3 px-5 rounded mt-32"
            to="desastres"
            spy={true}
            smooth={true}
            duration={500}>
            Conóce la Guía
          </Link>
        </div>
        
      </div>

      <div className="m-3" id="desastres">
            {/* empieza parte de desastres */}
            <div className="sm:flex sm:justify-center">
  <div
    className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-violet-300 sm:shrink-0 sm:grow sm:basis-0 sm:rounded-r-none">
    <a href="#!">
      <img
        className="rounded-t-lg sm:rounded-tr-none"
        src="/img/inundacion.jpeg"
        alt="Hollywood Sign on The Hill" />
    </a>
    <div className="p-6">
      <h5
        className="mb-2 text-xl font-medium leading-tight text-violet-800 dark:text-violet-900 mb-10">
        Guía para Inundaciones
      </h5>
      <Link
            className="text-lg bg-violet-300text-dark hover:bg-dark hover:text-light hover:cursor-pointer transition-all duration-300 p-3 px-5 rounded mt-32"
            to="inundaciones"
            spy={true}
            smooth={true}
            duration={500}>
            Conóce la Guía
          </Link>
    </div>
  </div>
  <div
    className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-violet-300 sm:shrink-0 sm:grow sm:basis-0 sm:rounded-none">
    <a href="#!">
      <img
        className="rounded-t-lg sm:rounded-none"
        src="/img/deslizamiento.jpeg"
        alt="Palm Springs Road" />
    </a>
    <div className="p-6">
      <h5
        className="mb-2 text-xl mb-3 font-medium leading-tight mb-10 text-neutral-800 dark:text-violet-900">
        Guía para Deslizamiento
      </h5>
      <Link
            className="text-lg bg-light-500 text-dark hover:bg-dark hover:text-light hover:cursor-pointer transition-all duration-300 p-3 px-5 rounded mt-32"
            to="Deslizamiento"
            spy={true}
            smooth={true}
            duration={500}>
            Conóce la Guía
          </Link>
    </div>
  </div>
  <div
    className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-violet-300 sm:shrink-0 sm:grow sm:basis-0 sm:rounded-l-none">
    <a href="#!">
      <img
        className="rounded-t-lg sm:rounded-tl-none"
        src="/img/incendio.jpeg"
        alt="Los Angeles Skyscrapers" />
    </a>
    <div className="p-6">
      <h5
        className="mb-2 text-xl font-medium mb-10 leading-tight text-neutral-800 dark:text-violet-900">
        Guía para Incendios
      </h5>
      <Link
            className="text-lg bg-light-500 text-dark hover:bg-dark hover:text-light hover:cursor-pointer transition-all duration-300 p-3 px-5 rounded mt-32"
            to="incendios"
            spy={true}
            smooth={true}
            duration={500}>
            Conóce la Guía
          </Link>
    </div>
  </div>
</div>


<div id="inundaciones"
  className="block mt-10 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-neutral-200">
  <div
    className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-300 dark:text-neutral-800">
    Inundaciones 
  </div>
  <div className="p-6">
    <blockquote>
    <p className="text-xl">
        <p className="font-bold">Seguro</p>
        Realiza kits de emergencia e identifica las zonas de riesgo más cercanas.
        Ayuda a los vecinos afectados si es posible.
Colabora con las autoridades locales para la limpieza y reconstrucción.
      </p>

      <p className="text-xl mt-3">
        <p className="font-bold">Riesgo</p>
      Infórmate sobre las áreas propensas a inundaciones en tu región.
        Prepara un kit de emergencia que incluya alimentos no perecederos, agua, linterna, medicamentos, documentos importantes y ropa impermeable.
    Desarrolla un plan de evacuación y compártelo con tu familia. Determina rutas seguras y puntos de encuentro.
      </p>

      <p className="text-xl mt-3">
        <p className="font-bold">Peligro</p>
        Evacua inmediatamente. Identifica las rutas de evacuación más cercanas a ti y utiliza las líneas de emergencia. Evalúa los daños y realiza reparaciones necesarias para prevenir futuras inundaciones.
Considera elevar la altura de los electrodomésticos y las instalaciones eléctricas.
      </p>
    </blockquote>
    
  </div>
</div>

<div id="Deslizamiento"
  className="block mt-10 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-neutral-200">
  <div
    className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-300 dark:text-neutral-800">
    Deslizamientos 
  </div>
  <div className="p-6">
    <blockquote>
    <p className="text-xl">
        <p className="font-bold">Seguro</p>
        Construye tu hogar lejos de laderas empinadas y utiliza técnicas de construcción que minimicen el riesgo de deslizamientos.
      </p>

      <p className="text-xl mt-3">
        <p className="font-bold">Riesgo</p>
        Estabiliza la pendiente del suelo alrededor de tu propiedad mediante terrazas o estructuras de retención.
Asegúrate de que las canaletas y los sistemas de drenaje estén libres de obstrucciones para evitar acumulación de agua.
      </p>

      <p className="text-xl mt-3">
        <p className="font-bold">Peligro</p>
        No regreses a tu hogar hasta que las autoridades indiquen que es seguro hacerlo.
Consulta con profesionales para evaluar los daños estructurales antes de ocupar nuevamente la vivienda.
      </p>


    </blockquote>
    
  </div>
</div>


<div id="incendios"
  className="block mt-10 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-neutral-200">
  <div
    className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-300 dark:text-neutral-800">
    Incendios 
  </div>
  <div className="p-6">
    <blockquote>
    <p className="text-xl">
        <p className="font-bold">Seguro</p>
        Asegúrate de que tu hogar cumpla con las regulaciones locales de prevención de incendios.
Mantén una distancia segura entre tu propiedad y áreas boscosas.
      </p>

      <p className="text-xl mt-3">
        <p className="font-bold">Riesgo</p>
        Mantén tu propiedad libre de materiales inflamables y crea una zona de seguridad alrededor de tu casa, limpiando arbustos secos y ramas.
Desarrolla un plan de evacuación con rutas seguras y puntos de encuentro, y compártelo con tu familia.
      </p>

      <p className="text-xl mt-3">
        <p className="font-bold">Peligro</p>
        Sigue las instrucciones de las autoridades y evacua si se emite una orden.
Cierra las ventanas y las puertas de tu hogar para evitar que el humo entre. Identifica las rutas de evacuación más cercanas a ti y utiliza las líneas de emergencia. Infórmate sobre las áreas propensas a incendios forestales en tu región.
Prepara un kit de emergencia que incluya alimentos no perecederos, agua, ropa adecuada, linterna, mapas y documentos importantes.
      </p>

    </blockquote>
    
  </div>
</div>







        </div>
    </div>
  );
}
