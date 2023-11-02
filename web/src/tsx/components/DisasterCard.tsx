import { motion } from "framer-motion";
import { DisasterCardProps } from "../utils/Types";

export default function DisasterCard({icon, title, description, delay}: DisasterCardProps) {
    const fadein = {
        visible: {opacity: 1, scale: 1, transition: {duration: 0.5, delay, ease: 'linear'}},
        hover: {y: -20, transition: {duration: 0, ease: 'linear'}},
        hidden: {opacity: 0, scale: 0.75},
    };
    return <motion.div initial="hidden" layout whileInView="visible" variants={fadein} whileHover="hover" className=" bg-white shadow-lg rounded-xl border-4 hover:border-b-dark transition-all duration-300 w-1/3 p-6">
        <div className="mx-auto flex justify-center"><i className={"bx bx-lg text-dark-600 text-center  " + icon} /></div>
        <p className="text-neutral-800 text-center text-xl my-5 font-bold">{title}</p>
        <p className="text-neutral-700 text-center leading-loose">{description}</p>
    </motion.div>
}