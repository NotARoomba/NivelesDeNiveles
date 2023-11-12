import {motion} from 'framer-motion';
import {PersonCardProps} from '../utils/Types';

export default function PersonCard({
  name,
  role,
  image,
  github,
  insta,
  linkedin,
  delay,
}: PersonCardProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 75}}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {duration: 1, delay, ease: 'easeInOut'},
      }}>
      <div className="w-full h-auto aspect-square rounded-xl justify-center mx-auto relative group z-20 overflow-hidden">
        <img src={image} className="rounded-xl -z-20" />
        <div className="w-full h-24 bg-accent-700/80 absolute -bottom-full group-hover:bottom-0 rounded-xl transition-all duration-500 z-10" />

        {/* <a href={github} className='absolute bottom-1/2 w-12 h-12 translate-y-1/2 font-bold text-xl bg-light left-1/2 -translate-x-1/2  z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full justify-center'>
        <i className={'bx bx-md text-dark bx-link-alt justify-center mx-1.5 my-1.5'} />
      </a> */}
        <p className="absolute bottom-8 font-bold text-2xl w-64 text-center text-neutral-800 left-1/2 -translate-x-1/2 z-30 translate-y-32 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          {name}
        </p>
        <p className="absolute bottom-3 text-xl font-semibold text-neutral-800 w-64 left-1/2 text-center -translate-x-1/2 z-30 translate-y-32 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          {role}
        </p>
      </div>
      <div className="w-full mx-auto justify-center flex gap-8">
        <a
          href={github}
          className="h-12 font-bold text-xl  z-30  transition-all duration-500 rounded-full justify-center">
          <i
            className={'bx bx-md text-dark bxl-github justify-center my-1.5'}
          />
        </a>
        {linkedin && (
          <a
            href={linkedin}
            className=" h-12 font-bold text-xl  z-30  transition-all duration-500 rounded-full justify-center">
            <i
              className={
                'bx bx-md text-dark bxl-linkedin justify-center  my-1.5'
              }
            />
          </a>
        )}
        <a
          href={insta}
          className=" h-12 font-bold text-xl  z-30  transition-all duration-500 rounded-full justify-center">
          <i
            className={
              'bx bx-md text-dark bxl-instagram justify-center  my-1.5'
            }
          />
        </a>
      </div>
    </motion.div>
  );
}
