// export default function TreeNode({node, x, y, level, highlightValue}){
//   if (!node) return null;
  
//   const horizontalGap = 180 / Math.pow(2, level);
//   const verticalGap = 80;
//   const leftX = x - horizontalGap;
//   const leftY = y + verticalGap;
//   const rightX = x + horizontalGap;
//   const rightY = y + verticalGap;
//   const isHighlighted= node.value===highlightValue

//   return (
//     <>
//       {node.left && (
//         <line x1={x} y1={y} x2={leftX} y2={leftY} stroke={isHighlighted ? '#38bdf8' : '#6b7280'}
//           strokeWidth={isHighlighted ? 4 : 2}
//           className={isHighlighted ? 'glow-line' : ''} />
//       )}
//       {node.right && (
//         <line x1={x} y1={y} x2={rightX} y2={rightY} stroke={isHighlighted ? '#38bdf8' : '#6b7280'}
//           strokeWidth={isHighlighted ? 4 : 2}
//           className={isHighlighted ? 'glow-line' : ''} />
//       )}
      
//       <TreeNode node={node.left} x={leftX} y={leftY} level={level + 1} highlightValue={highlightValue} />
//       <TreeNode node={node.right} x={rightX} y={rightY} level={level + 1} highlightValue={highlightValue}/>
      
//       <circle cx={x} cy={y} r="22" fill={node.color} stroke={isHighlighted ? '#38bdf8' : '#fff'}
//         strokeWidth={isHighlighted ? 4 : 2}
//         className={isHighlighted ? 'glow-node' : ''} />

//       <text x={x} y={y + 5} textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
//         {node.value}
//       </text>
//     </>
//   );
// }

export default function TreeNode({ node, x, y, level, highlightValue }) {
  if (!node) return null;

  const horizontalGap = 180 / Math.pow(2, level);
  const verticalGap = 80;
  const leftX = x - horizontalGap;
  const leftY = y + verticalGap;
  const rightX = x + horizontalGap;
  const rightY = y + verticalGap;

  const isHighlighted = node.value === highlightValue;

  return (
    <>
      {node.left && (
        <line
          x1={x}
          y1={y}
          x2={leftX}
          y2={leftY}
          stroke="#6b7280"
          strokeWidth="2"
        />
      )}

      {/* right child connection */}
      {node.right && (
        <line
          x1={x}
          y1={y}
          x2={rightX}
          y2={rightY}
          stroke="#6b7280"
          strokeWidth="2"
        />
      )}

      {/* recursively render children */}
      <TreeNode
        node={node.left}
        x={leftX}
        y={leftY}
        level={level + 1}
        highlightValue={highlightValue}
      />
      <TreeNode
        node={node.right}
        x={rightX}
        y={rightY}
        level={level + 1}
        highlightValue={highlightValue}
      />

      {/* node circle */}
      <circle
        cx={x}
        cy={y}
        r="22"
        fill={node.color}
        stroke={isHighlighted ? "#38bdf8" : "#fff"}     // sky-blue glow
        strokeWidth={isHighlighted ? 5 : 2}
        className={isHighlighted ? "glow-node" : ""}
      />

      {/* node text */}
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="bold"
      >
        {node.value}
      </text>
    </>
  );
}
