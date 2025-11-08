import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RulePopups from './RulePopups';
import ControlPanel from './ControlPanel';
import RedBlackTree from '../utils/RedBlackTree';
import StepControls from './StepControls';
import TreeCanvas from './TreeCanvas';
import RulesSection from './RulesSection';


export default function RBTVisualizer() {
  const [tree] = useState(() => new RedBlackTree());
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [isAnimating, currentStep, steps.length]);

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    tree.insert(value);
    setSteps(tree.steps);
    setCurrentStep(0);
    setIsAnimating(true);
    setInputValue('');
  };

  const handleDelete = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    tree.delete(value);
    setSteps(tree.steps);
    setCurrentStep(0);
    setIsAnimating(true);
    setInputValue('');
  };

  const handleReset = () => {
    tree.root = null;
    tree.steps = [];
    setSteps([]);
    setCurrentStep(0);
    setIsAnimating(false);
  };

  const currentTree = steps[currentStep]?.tree;

  return (
    <div className="min-h-screen bg-[#FCF9EA] p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-blue-900 mb-2 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Red-Black Tree Visualizer
        </motion.h1>
        <motion.p 
          className="text-blue-700 text-center mb-8"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Watch insertions and deletions step-by-step with smooth animations
        </motion.p>

        <motion.div 
          className="bg-[#FFBDBD] rounded-lg shadow-2xl p-6 mb-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ControlPanel
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleInsert={handleInsert}
          handleDeleteDelete={handleDelete} 
          handleResetReset={handleReset}
          isAnimating={isAnimating}
          />

          {steps.length > 0 && (
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-[#FCF9EA] rounded-lg p-4 mb-4">
                <motion.p 
                  className="text-blue-900 text-center font-medium"
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.description}
                </motion.p>
              </div>
              <StepControls 
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              steps={steps}
              isAnimating={isAnimating}
              setIsAnimating={setIsAnimating}
              />
            </motion.div>
          )}
        </motion.div>

        <TreeCanvas currentTree={currentTree} highlightValue={steps[currentStep]?.highlightValue} />
        <RulePopups />
        <motion.div 
          className="bg-[#FFBDBD] rounded-lg shadow-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <RulesSection />
        </motion.div>
      </div>
    </div>
  );
}