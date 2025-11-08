import { motion } from "framer-motion";

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
        <motion.line
          x1={x}
          y1={y}
          x2={leftX}
          y2={leftY}
          stroke="#6b7280"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
      {node.right && (
        <motion.line
          x1={x}
          y1={y}
          x2={rightX}
          y2={rightY}
          stroke="#6b7280"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}

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

      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHighlighted ? 1.15 : 1, 
          opacity: 1,
          x: x,
          y: y
        }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          scale: { duration: 0.3 }
        }}
      >
        <motion.circle
          cx={0}
          cy={0}
          r="22"
          fill={node.color}
          stroke={isHighlighted ? "#38bdf8" : "#fff"}
          strokeWidth={isHighlighted ? 5 : 2}
          animate={{
            filter: isHighlighted 
              ? "drop-shadow(0 0 12px #38bdf8)" 
              : "drop-shadow(0 0 0px transparent)"
          }}
          transition={{ duration: 0.3 }}
        />
        <text
          x={0}
          y={5}
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="bold"
        >
          {node.value}
        </text>
      </motion.g>
    </>
  );
}