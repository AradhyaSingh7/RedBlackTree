import TreeNode from './TreeNode'

export default function TreeCanvas({currentTree}){
return (
    <div className="bg-[#BADFDB] rounded-lg shadow-2xl p-6 mb-6">
          <svg width="100%" height="500" viewBox="0 0 800 500" className="bg-[#E8F6F5] rounded">
            {currentTree && <TreeNode node={currentTree} x={400} y={50} level={0} />}
            {!currentTree && (
              <text x="50%" y="50%" textAnchor="middle" fill="#64748b" fontSize="20">
                Tree is empty. Insert a value to begin.
              </text>
            )}
          </svg>
        </div>
);
}