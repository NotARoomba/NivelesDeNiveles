import {motion} from 'framer-motion';
import {AdvancementCardProps} from '../utils/Types';

export default function AdvancementCard({
  title,
  subtitle,
  link,
  imagePath,
}: AdvancementCardProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 75}}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {duration: 0.75, delay: 0.25},
      }}
      className="w-2/5 h-auto rounded-xl justify-center mx-auto relative group z-20 overflow-hidden">
      <img src={imagePath} className="rounded-xl -z-20" />
      <div className="w-full h-full bg-accent-700/30 absolute bottom-0 -right-full group-hover:right-0 rounded-xl transition-all duration-500 z-10" />
      <p className="absolute top-5 font-bold text-2xl text-white left-1/2 -translate-x-1/2 z-30 -translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        {title}
      </p>
      <a
        href={link}
        className="absolute bottom-1/2 w-12 h-12 translate-y-1/2 font-bold text-xl bg-light left-1/2 -translate-x-1/2  z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full justify-center">
        <i
          className={
            'bx bx-md text-dark bx-link-alt justify-center mx-1.5 my-1.5'
          }
        />
      </a>
      <p className="absolute bottom-3 text-xl text-white w-48 left-1/2 -translate-x-1/2 z-30 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        {subtitle}
      </p>
    </motion.div>
  );
}
