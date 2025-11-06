import { useState, useEffect } from 'react';
import RedBlackTree from '../utils/RedBlackTree';
import ControlPanel from './ControlPanel';
import StepControls from './StepControls';
import TreeCanvas from './TreeCanvas';
import RulesSection from './RulesSection';
import RulePopups from './RulePopups';


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
    <div className="min-h-screen bg-[#FCF9EA] to-pink-50 to-ambrose-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue mb-2 text-center">Red-Black Tree Visualizer</h1>
        <p className="text-blue text-center mb-8">Watch insertions and deletions step-by-step</p>
        
        <div className="bg-[#FFBDBD] rounded-lg shadow-2xl p-6 mb-6">                
          <ControlPanel
          inputValue={inputValue}
          setInputValue={setInputValue}
          onInsert={handleInsert}
          onDelete={handleDelete} 
          onReset={handleReset}
          isAnimating={isAnimating}
          />

          {steps.length > 0 && (
            <div className="mt-6">
              <div className="bg-[#FCF9EA] rounded-lg p-4 mb-4">
                <p className="text-blue text-center font-medium">
                  Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.description}
                </p>
              </div>

              <StepControls 
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              steps={steps}
              isAnimating={isAnimating}
              setIsAnimating={setIsAnimating}
              />
            </div>
          )}
        </div>

        <TreeCanvas currentTree={currentTree} highlightValue={steps[currentStep]?.highlightValue}/>
        <RulePopups />
        <RulesSection />
      </div>
    </div>
  );
}