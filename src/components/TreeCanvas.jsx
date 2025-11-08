import TreeNode from './TreeNode'
import { motion, AnimatePresence} from "framer-motion";
export default function TreeCanvas({ currentTree, highlightValue }) {
  return (
    <div className="bg-[#BADFDB] rounded-lg shadow-2xl p-6 mb-6">
      <svg width="100%" height="500" viewBox="0 0 800 500" className="bg-[#E8F6F5] rounded">
        <AnimatePresence mode="wait">
          {currentTree ? (
            <motion.g
              key={currentTree?.value}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TreeNode node={currentTree} x={400} y={50} level={0} highlightValue={highlightValue} />
            </motion.g>
          ) : (
            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              fill="#64748b"
              fontSize="20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Tree is empty. Insert a value to begin.
            </motion.text>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}