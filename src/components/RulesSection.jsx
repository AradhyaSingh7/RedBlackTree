export default function RulesSection(){
    return(
        <div className="bg-[#FFBDBD] rounded-lg shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Red-Black Tree Rules</h2>
          <div className="space-y-3 text-blue font-[635]">
            <p><span className="font-semibold text-gray-800 font-[700]">Rule 1:</span> Every node is either RED or BLACK</p>
            <p><span className="font-semibold text-gray-800 font-[700]">Rule 2:</span> The root is always BLACK</p>
            <p><span className="font-semibold text-gray-800 font-[700]">Rule 3:</span> All NULL leaves are BLACK</p>
            <p><span className="font-semibold text-gray-800 font-[700]">Rule 4:</span> If a node is RED, both its children must be BLACK (no two RED nodes in a row)</p>
            <p><span className="font-semibold text-gray-800 font-[700]">Rule 5:</span> Every path from root to NULL contains the same number of BLACK nodes</p>
          </div>
        </div>
    );
}