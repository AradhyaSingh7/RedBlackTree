import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import {motion} from 'framer-motion'
export default function StepControls({ currentStep, setCurrentStep, steps, isAnimating, setIsAnimating }){
  return(
    <div className="flex justify-center gap-4 mb-4">
                <motion.button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0 || isAnimating}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded flex items-center gap-2 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft size={20} /> Previous
                </motion.button>
                <motion.button
                  onClick={() => {
                    setCurrentStep(0);
                    setIsAnimating(true);
                  }}
                  disabled={isAnimating}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 text-white rounded flex items-center gap-2 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={20} /> Play
                </motion.button>
                <motion.button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep === steps.length - 1 || isAnimating}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded flex items-center gap-2 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next <ChevronRight size={20} />
                </motion.button>
              </div>
  )
}