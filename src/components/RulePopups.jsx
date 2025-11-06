import { useState } from "react";

export default function RulePopups() {
  const [activePopup, setActivePopup] = useState(null); // "insert", "delete", or null

  const closePopup = () => setActivePopup(null);

  return (
    <div className="flex justify-center gap-6 my-8">
      {/* --- Buttons --- */}
      <button
        onClick={() => setActivePopup("insert")}
        className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition shadow-sm"
      >
        Insertion Rules
      </button>

      <button
        onClick={() => setActivePopup("delete")}
        className="px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-semibold transition shadow-sm"
      >
        Deletion Rules
      </button>

      {/* --- Popup Overlay --- */}
      {activePopup && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300"
          onClick={closePopup}
        >
          {/* --- Popup Content --- */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative bg-[#FCF9EA]/90 backdrop-blur-md border border-slate-300 rounded-2xl shadow-2xl 
                        max-w-3xl w-[90%] p-8 animate-fadeIn overflow-y-auto max-h-[80vh] ${
                          activePopup === "insert"
                            ? "shadow-emerald-200"
                            : "shadow-rose-200"
                        }`}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-5 text-slate-600 hover:text-slate-800 text-2xl font-bold"
            >
              ×
            </button>

            {activePopup === "insert" ? (
              <>
                <h3 className="text-3xl font-semibold text-emerald-700 mb-4 text-center">
                  Insertion Rules
                </h3>
                <ul className="list-disc pl-6 text-slate-700 leading-relaxed text-left text-lg space-y-2">
                  <li>
                    New nodes are always inserted as <strong>RED</strong> leaf nodes.
                  </li>
                  <li>
                    <strong>Case 1:</strong> Uncle is <strong>RED</strong> → Recolor parent,
                    uncle, and grandparent.
                  </li>
                  <li>
                    <strong>Case 2:</strong> Uncle is <strong>BLACK</strong> and the new node
                    is an <em>inner child</em> → Rotate parent to make it an outer case.
                  </li>
                  <li>
                    <strong>Case 3:</strong> Uncle is <strong>BLACK</strong> and node is an
                    <em> outer child</em> → Recolor parent and grandparent, then rotate
                    grandparent.
                  </li>
                  <li>
                    Finally, always ensure the <strong>root is BLACK</strong>.
                  </li>
                </ul>
              </>
            ) : (
              <>
                <h3 className="text-3xl font-semibold text-rose-700 mb-4 text-center">
                  Deletion Rules
                </h3>

                <p className="text-slate-700 text-left text-lg mb-3 leading-relaxed">
                  When deleting a node from a Red-Black Tree, if a <strong>BLACK node</strong> is removed
                  or replaced by a <strong>BLACK child</strong>, a <strong>double-black</strong> situation occurs.
                  This means one subtree temporarily has one fewer black node, violating the
                  black-height property. The following cases describe how this imbalance is fixed:
                </p>

                <ul className="list-disc pl-6 text-slate-700 leading-relaxed text-left text-lg space-y-2">
                  <li>
                    <strong>Case 1:</strong> Sibling is <strong>RED</strong> → Recolor sibling and parent, then rotate parent.
                    This transforms it into one of the following black-sibling cases.
                  </li>
                  <li>
                    <strong>Case 2:</strong> Sibling and both of sibling’s children are
                    <strong> BLACK</strong> → Recolor sibling <strong>RED</strong> and move the double-black
                    up to the parent.
                  </li>
                  <li>
                    <strong>Case 3:</strong> Sibling’s far child is <strong>BLACK</strong> but near child is <strong>RED</strong> →
                    Recolor sibling and near child, then rotate sibling. Converts to Case 4.
                  </li>
                  <li>
                    <strong>Case 4:</strong> Sibling’s far child is <strong>RED</strong> →
                    Recolor sibling and parent, rotate parent, and set far child to BLACK.
                    This removes the double-black.
                  </li>
                  <li>
                    If the node being deleted was <strong>RED</strong>, no fix is needed.
                  </li>
                  <li>
                    Always ensure the <strong>root remains BLACK</strong> after deletion.
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
