        
    import { RotateCcw } from "lucide-react"
    export default function ControlPanel({inputValue, setInputValue, onInsert, onDelete, onReset, isAnimating}){
        return(
        <div className="flex gap-4 items-center justify-center mb-4">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="px-4 py-2 rounded border border-slate-600 bg-gray-100 text-blue focus:outline-none focus:ring-2 focus:ring-blue-400"
              onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
            />
            <button
              onClick={onInsert}
              disabled={isAnimating}
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-200 text-white rounded font-semibold transition shadow-sm"
            >
              Insert
            </button>
            <button
              onClick={onDelete}
              disabled={isAnimating}
              className="px-6 py-2 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-200 text-white rounded font-semibold transition shadow-sm"
            >
              Delete
            </button>
            <button
              onClick={onReset}
              disabled={isAnimating}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 rounded transition shadow-sm"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        )
    }