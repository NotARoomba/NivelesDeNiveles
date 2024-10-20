import {motion} from 'framer-motion';
import {Link} from 'react-scroll';
import {Link as BrowserLink} from 'react-router-dom';
import DisasterCard from '../components/DisasterCard';
import AdvancementCard from '../components/AdvancementCard';
import SectionHeader from '../components/SectionHeader';
import PersonCard from '../components/PersonCard';
import 'react-slideshow-image/dist/styles.css';
import {Slide} from 'react-slideshow-image';
import SVG from 'react-inlinesvg';
import SmartBanner from 'react-smartbanner';
import {AppStoreButton, GooglePlayButton} from 'react-mobile-app-button';
import {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import {Localizations} from '../utils/Localizations';

export default function Home() {
  const fadein = {
    visible: {opacity: 1, scale: 1, transition: {duration: 1}},
    hidden: {opacity: 0, scale: 0},
  };
  const technologies = [
    {
      title: 'Arduino',
      link: 'https://cdn.svgporn.com/logos/arduino.svg',
    },
    {
      title: 'TailwindCSS',
      link: 'https://cdn.svgporn.com/logos/tailwindcss.svg',
    },
    {
      title: 'Git',
      link: 'https://cdn.svgporn.com/logos/git.svg',
    },
    {
      title: 'Twilio',
      link: 'https://cdn.svgporn.com/logos/twilio.svg',
    },
    {
      title: 'MongoDB',
      link: 'https://cdn.svgporn.com/logos/mongodb.svg',
    },
    {
      title: 'OneSignal',
      link: 'https://cdn.svgporn.com/logos/onesignal.svg',
    },
    {
      title: 'ExpressJS',
      link: 'https://cdn.svgporn.com/logos/express.svg',
    },
    {
      title: 'React',
      link: 'https://cdn.svgporn.com/logos/react.svg',
    },
    {
      title: 'Socket.io',
      link: 'https://cdn.svgporn.com/logos/socket.io.svg',
    },
    {
      title: 'Figma',
      link: 'https://cdn.svgporn.com/logos/figma.svg',
    },
    {
      title: 'VS Code',
      link: 'https://cdn.svgporn.com/logos/visual-studio-code.svg',
    },
    {
      title: 'XCode',
      link: 'https://cdn.svgporn.com/logos/xcode.svg',
    },
    // '/clients/git.png',
    // '/clients/nativewind.jpeg',
    // '/clients/react.png',
    // '/clients/Socket-io.svg.png',
    // '/clients/Twilio_logo.png',
    // '/clients/vs.png',
    // '/clients/xcode.png',
  ];
  const sdk = new ChartsEmbedSDK({
    baseUrl: 'https://charts.mongodb.com/charts-nivelesdeniveles-temwe',
    widthMode: 'scale',
    heightMode: 'scale',
  });

  const chartDiv = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(true);
  const [chart] = useState(
    sdk.createChart({
      maxDataAge: 60,
      autoRefresh: true,
      background: 'transparent',
      chartId: '65541c60-1ebd-424a-8c44-f5162670e372',
      theme: 'light',
    }),
  );
  useEffect(() => {
    if (chartDiv.current)
      chart
        .render(chartDiv.current)
        .then(async () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (((await chart.getData()) as any).documents.length == 0)
            setVisible(false);
        })
        .catch(err => {
          setVisible(false);
          console.log(err);
        });
  }, [chart, chartDiv]);
  return (
    <div id="home" className="text-black">
      <SmartBanner
        title={'Niveles De Niveles'}
        daysHidden={0}
        daysReminder={0}
      />
      <div className=" bg-light-600 mx-auto my-auto justify-center flex-col lg:flex lg:flex-row-reverse h-screen py-32 px-2 lg:p-52">
        <div className="justify-center lg:justify-start my-auto mx-auto lg:mr-auto ">
          <img
            src="/img/logo.png"
            className="h-48 sm:h-80 z-10 animate animate-slowBounce mx-auto"
          />
        </div>
        <div className="justify-center mt-12 lg:my-auto align-middle mr-0 w-full text-center lg:text-start lg:w-6/12 mx-auto">
          <p className="text-5xl text-dark font-bold">Niveles De Niveles</p>
          <p className="text-2xl text-neutral-600 my-4 mb-8">
            {Localizations.slogan}
          </p>
          <Link
            className="text-lg bg-accent-500 text-dark hover:bg-dark hover:text-light hover:cursor-pointer transition-all duration-300 p-3 px-5 rounded"
            to="about"
            spy={true}
            smooth={true}
            duration={500}>
            {Localizations.knowButton}
          </Link>
        </div>
      </div>
      <div className="w-full bg-white">
        <div
          id="about"
          className="flex-col bg-white lg:flex lg:flex-row w-9/12 mx-auto py-16 h-fit justify-between ">
          <motion.img
            src="/img/about-img.svg"
            className=" h-[400px] mx-auto lg:mt-0 lg:mr-12 lg:w-1/2 my-auto align-middle"
            variants={fadein}
            initial="hidden"
            whileInView="visible"
          />
          <div className="w-full lg:w-1/2">
            <div>
              <motion.p
                initial={{opacity: 0, y: 75}}
                whileInView={{opacity: 1, y: 0, transition: {duration: 0.75}}}
                className="font-bold text-dark text-4xl mt-8 text-center lg:text-start">
                {Localizations.header1}
              </motion.p>
              <motion.p
                initial={{opacity: 0, y: 75}}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {duration: 0.75, delay: 0.25},
                }}
                className="text-neutral-600 my-5">
                {Localizations.p1}{' '}
                <BrowserLink
                  to="/advice"
                  className="transition justify-center mx-auto  my-auto text-cyan-600 hover:underline hover:text-dark hover:text-underline hover:cursor-pointer duration-200">
                  {Localizations.guia}
                </BrowserLink>
                .
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
                  {Localizations.sensorsHeader}
                </p>
                <p className="text-neutral-600">{Localizations.sensorText}</p>
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
                <p className="text-xl font-bold text-dark-600">
                  {Localizations.crowdHeader}
                </p>
                <p className="text-neutral-600">{Localizations.crowdText}</p>
              </motion.div>
            </div>
          </div>
        </div>
        <div id="disasters" className="w-full bg-accent-900/70 pb-12">
          <div className="w-10/12 lg:9/12 2xl:w-8/12 mx-auto justify-center py-10">
            <SectionHeader
              title={Localizations.desastres}
              subtitle={Localizations.desastresHeader}
            />
            <div className="flex-col lg:flex-row lg:flex  lg:gap-8 lg:gap-y-8">
              <DisasterCard
                icon="bx-water"
                title={Localizations.desbordamientoHead}
                description={Localizations.desbordamientoText}
                delay={0}
              />
              <DisasterCard
                icon="bxs-hot"
                title={Localizations.incendioHead}
                description={Localizations.incendioText}
                delay={window.screen.width > 1024 ? 0.25 : 0}
              />
              <DisasterCard
                icon="bx-landscape"
                title={Localizations.deslizamientoHead}
                description={Localizations.desbordamientoText}
                delay={window.screen.width > 1024 ? 0.5 : 0}
              />
            </div>
          </div>
          {isVisible && <div className="w-10/12 mx-auto h-96" ref={chartDiv} />}{' '}
          ;
        </div>
        <div id="resources" className="w-full bg-white pb-12">
          <div className="w-10/12 lg:7/12 mx-auto justify-center py-10">
            <SectionHeader
              title={Localizations.recursos}
              subtitle={Localizations.recursosHead}
            />
            <motion.div
              initial={{opacity: 0, y: 75}}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {duration: 0.75, delay: 0.25},
              }}>
              <iframe
                className="mx-auto w-full max-w-2xl h-full aspect-video"
                src="https://www.youtube.com/embed/a1bNz8M6Sew?si=hCeSToOI6zhFPqWr"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </motion.div>
            <div className=" flex-row md:flex jutify-center mx-auto w-full gap-3 my-8">
              <AdvancementCard
                title="GitHub"
                subtitle={Localizations.repo}
                link="https://github.com/NotARoomba/NivelesDeNiveles"
                imagePath="/img/portfolio/hub.png"
                textColor="text-light"
              />
              <AdvancementCard
                title={Localizations.politica}
                subtitle=""
                link="https://nivelesdeniveles.org/policy.pdf"
                imagePath="/img/portfolio/blog.png"
                textColor="text-dark"
              />
            </div>
            <div className="flex flex-wrap justify-center w-full mx-auto gap-8">
              <motion.div
                className="mx-auto"
                initial={{opacity: 0, y: 75}}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {duration: 0.75, delay: 0.25},
                }}>
                <AppStoreButton
                  url="https://apple.co/3SKLZIm"
                  theme={'dark'}
                  title={Localizations.download}
                  height={60}
                  width={200}
                  className="justify-center mx-auto mt-8"
                />
              </motion.div>
              <motion.div
                className="mx-auto"
                initial={{opacity: 0, y: 75}}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {duration: 0.75, delay: 0.25},
                }}>
                <GooglePlayButton
                  url="https://play.google.com/store/apps/details?id=com.notaroomba.nivelesdeniveles"
                  theme={'dark'}
                  height={60}
                  width={200}
                  title={Localizations.download}
                  className="justify-center mx-auto mt-8 "
                />
              </motion.div>
            </div>
          </div>
          <div
            id="us"
            className=" w-full md:w-9/12 mx-auto justify-center py-10">
            <SectionHeader
              title={Localizations.equipo}
              subtitle={Localizations.equipoHead}
            />
            <div className="lg:flex lg:flex-row gap-8">
              <PersonCard
                name="Nathan Alspaugh"
                role={Localizations.nathan}
                image="/img/team/nathan.jpg"
                github="https://github.com/NotARoomba"
                linkedin="https://www.linkedin.com/in/notaroomba/"
                insta="https://www.instagram.com/notaroomba"
                delay={window.screen.width > 1024 ? 0.25 : 0}
              />
              <PersonCard
                name="Ashlee Yin"
                role={Localizations.ashlee}
                image="/img/team/ash.jpg"
                github="https://github.com/awangran"
                insta="https://www.instagram.com/ashlee_yin"
                linkedin="https://co.linkedin.com/in/ashlee-yin-romero-63204223a"
                delay={0}
              />
              <PersonCard
                name="Felipe Ochoa"
                role={Localizations.felipe}
                image="/img/team/pipe.jpg"
                github="https://github.com/felipeochoat"
                insta="https://www.instagram.com/felipeochoat"
                delay={window.screen.width > 1024 ? 0.25 : 0}
              />
            </div>
          </div>
        </div>
        <div className="w-full bg-accent-900/70">
          <div className="w-11/12 md:w-7/12 mx-auto justify-center py-10">
            <SectionHeader
              title={Localizations.herramientas}
              subtitle={Localizations.herramientasHead}
            />
            <Slide autoplay slidesToShow={1}>
              {technologies.map((img, i) => (
                <div
                  key={i}
                  className="my-auto mx-auto h-full justify-center align-middle">
                  <SVG
                    className="mx-auto my-auto align-middle justify-center"
                    src={img.link}
                    width={300}
                    height={100}
                    title={img.title}
                  />
                  {i > 4 && (
                    <p className="text-center font-bold text-3xl mt-3">
                      {img.title}
                    </p>
                  )}
                </div>
              ))}
            </Slide>
          </div>
        </div>
        <div className="w-full bg-white pb-12 px-8">
          <div className="md:w-7/12 mx-auto justify-center py-10">
            <div className="flex flex-row">
              <div className="justify-center mx-auto">
                <p className="mb-2 text-4xl">Niveles De Niveles</p>
                <p className=" text-lightText">Barranquilla, Colombia</p>
                <p className=" text-lightText">Hacks Costeños</p>
                <br />
                <a
                  href="mailto:nivelesdniveles@gmail.com"
                  className="my-9 underline text-lightText">
                  nivelesdniveles@gmail.com
                </a>
                <br />
                <a
                  href="https://github.com/NotARoomba/NivelesDeNiveles"
                  className="my-9 underline text-lightText">
                  GitHub
                </a>
                <br />
                <a
                  href="https://nivelesdeniveles.org/policy_es.pdf"
                  className="my-9 underline text-lightText">
                  {Localizations.politica}
                </a>
              </div>
              <div className="justify-left mx-auto">
                <p className="text-2xl">{Localizations.enlaces}</p>
                <Link
                  className=" cursor-pointer underline"
                  activeClass="active"
                  to="home"
                  href="#home"
                  spy={true}
                  smooth={true}
                  duration={500}>
                  {Localizations.inicio}
                </Link>
                <br />
                <Link
                  className=" cursor-pointer underline"
                  activeClass="active"
                  to="about"
                  href="#about"
                  spy={true}
                  smooth={true}
                  duration={500}>
                  {Localizations.mision}
                </Link>
                <br />
                <Link
                  className=" cursor-pointer underline"
                  activeClass="active"
                  to="disasters"
                  href="#disasters"
                  offset={-60}
                  spy={true}
                  smooth={true}
                  duration={500}>
                  {Localizations.desastres}
                </Link>
                <br />
                <Link
                  className=" cursor-pointer underline"
                  activeClass="active"
                  to="resources"
                  href="#resources"
                  offset={-60}
                  spy={true}
                  smooth={true}
                  duration={500}>
                  {Localizations.recursos}
                </Link>
                <br />
                <Link
                  className=" cursor-pointer underline"
                  activeClass="active"
                  to="us"
                  href="#us"
                  offset={-60}
                  spy={true}
                  smooth={true}
                  duration={500}>
                  {Localizations.nosotros}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
