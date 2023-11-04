import {motion} from 'framer-motion';
import NavBar from '../components/NavBar';
import {Link} from 'react-scroll';
import 'boxicons';
import DisasterCard from '../components/DisasterCard';
import AdvancementCard from '../components/AdvancementCard';

export default function Home() {
  const fadein = {
    visible: {opacity: 1, scale: 1, transition: {duration: 1}},
    hidden: {opacity: 0, scale: 0},
  };
  return (
    <div className="text-black">
      <NavBar />
      <div className=" bg-light-600 mx-auto my-auto justify-center flex flex-row h-auto p-52">
        <div className="justify-center my-auto align-middle mr-0 w-6/12 mx-auto">
          <p className="text-5xl text-dark font-bold">Niveles De Niveles</p>
          <p className="text-2xl text-neutral-600 my-4 mb-8">
            Llevando la seguridad de los Colombianos a otro nivel
          </p>
          <Link
            activeClass="active"
            className="text-lg bg-accent-500 text-dark hover:bg-dark hover:text-light hover:cursor-pointer transition-all duration-300 p-3 px-5 rounded"
            to="about"
            spy={true}
            smooth={true}
            duration={500}>
            Conóce nuestro proyecto
          </Link>
        </div>
        <div className="justify-start my-auto mr-auto">
          <img
            src="/logo.png"
            className="h-80 z-10 animate animate-slowBounce"
          />
        </div>
      </div>
      <div
        id="about"
        className="flex flex-row w-9/12 mx-auto py-32 h-fit justify-between ">
        <motion.img
          src="/about-img.svg"
          className=" h-[400px] mt-0 mr-12 w-1/2"
          variants={fadein}
          initial="hidden"
          whileInView="visible"
        />
        <div className="w-1/2">
          <div>
            <motion.p
              initial={{opacity: 0, y: 75}}
              whileInView={{opacity: 1, y: 0, transition: {duration: 0.75}}}
              className="font-bold text-dark text-4xl">
              La prevención y la información es la clave
            </motion.p>
            <motion.p
              initial={{opacity: 0, y: 75}}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {duration: 0.75, delay: 0.25},
              }}
              className="text-neutral-600 my-5">
              Niveles de Niveles es una plataforma que utiliza la prevención y
              la información como la herramienta más importante para combatir
              desastres naturales. Creamos un ambiente seguro donde los usuarios
              tienen la opción de reportar, ser alertados y estar informados
              sobre los niveles de riesgo de desastres naturales a su alrededor.
            </motion.p>
          </div>
          <div className="flex flex-row h-full">
            <motion.div
              initial={{opacity: 0, y: 75}}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {duration: 0.75, delay: 0.5},
              }}
              className="w-1/2 h-full">
              <i className="bx bx-lg bx-receipt text-dark-600" />
              <p className="text-xl font-bold text-dark-600">
                Nuestros Sensores
              </p>
              <p className="text-neutral-600">
                Utilizamos sensores para medir el nivel del agua y el movimiento
                de la tierra y así determinar el riesgo de desbordamientos y
                deslizamientos.
              </p>
            </motion.div>
            <motion.div
              initial={{opacity: 0, y: 75}}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {duration: 0.75, delay: 0.75},
              }}
              className="w-1/2 h-full">
              <i className="bx bx-lg bx-cube-alt text-dark-600" />
              <p className="text-xl font-bold text-dark-600">Crowdsourcing</p>
              <p className="text-neutral-600">
                Utilizamos un modelo de colaboración abierta (crowdsourcing)
                para obtener los reportes de desastres de la misma población.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="w-full bg-accent-900/70 pb-12">
        <div className="w-7/12 mx-auto justify-center py-10">
          <p className="text-neutral-400 text-center text-2xl my-2 font-bold">
            Desastres Naturales
          </p>
          <p className="text-neutral-700 text-center text-4xl my-2 font-bold">
            Los desastres que prevenimos son
          </p>
          <hr className="bg-accent w-24 h-1 my-5 justify-center mx-auto" />
          <div className="flex flex-row gap-8">
            <DisasterCard
              icon="bx-water"
              title="Desbordamientos"
              description="El desbordamiento de ríos, arroyos y otros cuerpos de agua causan inundaciones en
                diferentes municipios del Atlántico. Tener un mecanismo que alerte sobre estos les daría a las
                comunidades cercanas tiempo para recoger sus pertenencias más importantes y evitar daños mayores en sus
                viviendas. Para medir estos, utilizamos sensores ultrasónicos para medir el nivel del agua."
              delay={0}
            />
            <DisasterCard
              icon="bxs-hot"
              title="Incendios Forestales"
              description="En el Caribe colombiano se han reportado 150 incendios forestales este año y su causa principal son las altas temperaturas y las escasas lluvias. Una vez que estos llegan a un punto que su magnitud es tan grande que puede llevar días para detenerlo, por lo que si logramos reportar estos en el menor tiempo posible, será más fácil evitar la destrucción de la fauna a su alrededor."
              delay={0.25}
            />
            <DisasterCard
              icon="bx-landscape"
              title="Deslizamientos"
              description="Entre 1920 y 2020, se registraron más de 11.800 deslizamientos de tierra, pero solamente en 2022 se dieron 813. Esto es una prueba de cómo el cambio climático está afectando al país. Hay muchas personas que no saben que están en una zona de riesgo por lo que el tener una alerta sobre el movimiento de la tierra puede ayudar a las comunidades a evitar catástrofes. Utilizamos acelerómetros para medir el movimiento de la tierra."
              delay={0.5}
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-white pb-12">
        <div className="w-7/12 mx-auto justify-center py-10">
          <p className="text-neutral-400 text-center text-2xl my-2 font-bold">
            Recursos
          </p>
          <p className="text-neutral-700 text-center text-4xl my-2 font-bold">
            ¿Te interesa? Mira un poco de nuestros avances
          </p>
          <hr className="bg-accent w-24 h-1 my-5 justify-center mx-auto mb-12" />
          <iframe
            className="mx-auto"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/a1bNz8M6Sew?si=hCeSToOI6zhFPqWr"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
          <div className="my-8">
            <AdvancementCard
              title="GitHub"
              subtitle="Nuestro Repositorio"
              link="https://github.com/NotARoomba/NivelesDeNiveles"
              imagePath="/portfolio/hub.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
