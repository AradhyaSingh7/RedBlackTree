        
    import { RotateCcw } from "lucide-react"
    import { motion } from "framer-motion";

    export default function ControlPanel({inputValue, setInputValue, handleInsert, isAnimating, handleDelete, handleReset}){
    return (<div className="flex gap-4 items-center justify-center mb-4">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="px-4 py-2 rounded border border-slate-600 bg-gray-100 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
            />
            <motion.button
              onClick={handleInsert}
              disabled={isAnimating}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-200 text-white rounded font-semibold transition shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Insert
            </motion.button>
            <motion.button
              onClick={handleDelete}
              disabled={isAnimating}
              className="px-6 py-2 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-200 text-white rounded font-semibold transition shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete
            </motion.button>
            <motion.button
              onClick={handleReset}
              disabled={isAnimating}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 rounded transition shadow-sm"
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <RotateCcw size={20} />
            </motion.button>
          </div>
    )
          }