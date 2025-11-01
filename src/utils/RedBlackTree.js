import RBNode, {RED,BLACK} from "./RBNode";
export default class RedBlackTree {
  constructor() {
    this.root = null;
    this.steps = [];
  }

  addStep(description, tree, highlightValue = null) {
    this.steps.push({
      description,
      tree: this.cloneTree(tree || this.root),
      highlightValue
    });
  }

  cloneTree(node) {
    if (!node) return null;
    const clone = new RBNode(node.value);
    clone.color = node.color;
    clone.left = this.cloneTree(node.left);
    clone.right = this.cloneTree(node.right);
    if (clone.left) clone.left.parent = clone;
    if (clone.right) clone.right.parent = clone;
    return clone;
  }

  rotateLeft(node) {
    const right = node.right;
    node.right = right.left;
    
    if (right.left) right.left.parent = node;
    right.parent = node.parent;
    
    if (!node.parent) this.root = right;
    else if (node === node.parent.left) node.parent.left = right;
    else node.parent.right = right;
    
    right.left = node;
    node.parent = right;
  }

  rotateRight(node) {
    const left = node.left;
    node.left = left.right;
    
    if (left.right) left.right.parent = node;
    left.parent = node.parent;
    
    if (!node.parent) this.root = left;
    else if (node === node.parent.right) node.parent.right = left;
    else node.parent.left = left;
    
    left.right = node;
    node.parent = left;
  }

  insert(value) {
    this.steps = [];
    this.addStep(`Starting insertion of ${value}`, null);
    const node = new RBNode(value);
    
    if (!this.root) {
      this.root = node;
      this.addStep(`Tree is empty. Insert ${value} as root (red initially)`, null);
      this.root.color = BLACK;
      this.addStep(`Color root ${value} BLACK (Rule: Root must be black)`, null);
      return;
    }

    let parent = null;
    let current = this.root;
    
    while (current) {
      parent = current;
      if (value < current.value) current = current.left;
      else if (value > current.value) current = current.right;
      else {
        this.addStep(`Value ${value} already exists. Skipping insertion.`, null);
        return;
      }
    }

    node.parent = parent;
    if (value < parent.value) {
      parent.left = node;
      this.addStep(`${value}<${parent.value}. Insert at its left`);
    }
    else {
      parent.right = node;
      this.addStep(`${value}>${parent.value}. Insert at its right`)
    }
    
    this.fixInsert(node);
  }

  fixInsert(node) {
    while (node.parent && node.parent.color === RED) {
      if (node.parent === node.parent.parent.left) {
        const uncle = node.parent.parent.right;
        
        if (uncle && uncle.color === RED) {
          this.addStep(`Uncle of ${node.value} is RED. Recolor parent, uncle, and grandparent.`, null);
          node.parent.color = BLACK;
          uncle.color = BLACK;
          node.parent.parent.color = RED;
          this.addStep(`Recolored: Parent and uncle → BLACK, Grandparent → RED`, null);
          node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            this.addStep(`Uncle of ${node.value} is BLACK. Inner child → rotate parent.`, null);
            node = node.parent;
            this.rotateLeft(node);
            this.addStep(`Left rotation complete on ${node.value}`, null);
          }
          this.addStep(`Uncle of ${node.value} is BLACK. Outer child → recolor and rotate grandparent.`, null);
          node.parent.color = BLACK;
          node.parent.parent.color = RED;
          this.rotateRight(node.parent.parent);
          this.addStep(`Right rotation and recoloring complete`, null);
        }
      } else {
        const uncle = node.parent.parent.left;
        
        if (uncle && uncle.color === RED) {
          this.addStep(`Case 1: Uncle of ${node.value} is RED. Recolor parent, uncle, and grandparent.`, null);
          node.parent.color = BLACK;
          uncle.color = BLACK;
          node.parent.parent.color = RED;
          this.addStep(`Recolored: Parent and uncle → BLACK, Grandparent → RED`, null);
          node = node.parent.parent;
        } else {
          if (node === node.parent.left) {
            this.addStep(`Uncle of ${node.value} is BLACK. Inner child → rotate parent.`, null);
            node = node.parent;
            this.rotateRight(node);
            this.addStep(`Right rotation complete on ${node.value}`, null);
          }
          this.addStep(`Uncle of ${node.value} is BLACK. Outer child → recolor and rotate grandparent.`, null);
          node.parent.color = BLACK;
          node.parent.parent.color = RED;
          this.rotateLeft(node.parent.parent);
          this.addStep(`Left rotation and recoloring complete`, null);
        }
      }
    }
    
    this.root.color = BLACK;
    this.addStep(`Ensure root is BLACK. Insertion complete.`, null);
  }

delete(value) {
  this.steps = [];
  this.addStep(`Starting deletion of ${value}`, this.cloneTree(this.root));


  let node = this.root;
  while (node) {

    this.addStep(
      `Checking node ${node.value}`,
      this.cloneTree(this.root),
      node.value 
    );

    if (value < node.value) {
      node = node.left;
    } else if (value > node.value) {
      node = node.right;
    } else {
      break; 
    }
  }

  if (!node) {
    this.addStep(`Value ${value} not found in tree.`, this.cloneTree(this.root));
    return;
  }

  this.addStep(
    `Found node ${node.value}. Proceeding with deletion.`,
    this.cloneTree(this.root),
    node.value
  );

  this.deleteNode(node);
}


  findNode(node, value) {
    while (node) {
      if (value === node.value) return node;
      node = value < node.value ? node.left : node.right;
    }
    return null;
  }

  deleteNode(node) {
    let nodeToFix = null;
    let originalColor = node.color;
    
    if (!node.left) {
      this.addStep(`Node ${node.value} has no left child. Replace with right child.`, null);
      nodeToFix = node.right;
      this.transplant(node, node.right);
    } else if (!node.right) {
      this.addStep(`Node ${node.value} has no right child. Replace with left child.`, null);
      nodeToFix = node.left;
      this.transplant(node, node.left);
    } else {
      this.addStep(`Node ${node.value} has two children. Find inorder successor.`, null);
      const successor = this.minimum(node.right);
      this.addStep(`Inorder successor is ${successor.value}. Replace node with inorder successor.`, null);
      originalColor = successor.color;
      nodeToFix = successor.right;
      
      if (successor.parent === node) {
        if (nodeToFix) nodeToFix.parent = successor;
      } else {
        this.transplant(successor, successor.right);
        successor.right = node.right;
        successor.right.parent = successor;
      }
      
      this.transplant(node, successor);
      successor.left = node.left;
      successor.left.parent = successor;
      successor.color = node.color;
      this.addStep(`Replaced ${node.value} with inorder successor ${successor.value}`, null);
    }
    
    if (originalColor === BLACK) {
      this.addStep(`Deleted node was BLACK. Fix double-black violation.`, null);
      this.fixDelete(nodeToFix);
    } else {
      this.addStep(`Deleted node was RED. No fix needed. Deletion complete.`, null);
    }
  }

  transplant(u, v) {
    if (!u.parent) this.root = v;
    else if (u === u.parent.left) u.parent.left = v;
    else u.parent.right = v;
    if (v) v.parent = u.parent;
  }

  minimum(node) {
    while (node.left) node = node.left;
    return node;
  }

  fixDelete(node) {
    while (node !== this.root && (!node || node.color === BLACK)) {
      if (!node) break;
      
      if (node === node.parent.left) {
        let sibling = node.parent.right;
        
        if (sibling && sibling.color === RED) {
          this.addStep(`Sibling is RED. Recolor and rotate.`, null);
          sibling.color = BLACK;
          node.parent.color = RED;
          this.rotateLeft(node.parent);
          this.addStep(`Left rotation on parent. Sibling recolored.`, null);
          sibling = node.parent.right;
        }
        
        if (sibling && (!sibling.left || sibling.left.color === BLACK) && 
            (!sibling.right || sibling.right.color === BLACK)) {
          this.addStep(`Sibling and its children are BLACK. Recolor sibling RED.`, null);
          sibling.color = RED;
          node = node.parent;
        } else {
          if (sibling && (!sibling.right || sibling.right.color === BLACK)) {
            this.addStep(`Sibling's right child is BLACK. Rotate and recolor.`, null);
            if (sibling.left) sibling.left.color = BLACK;
            sibling.color = RED;
            this.rotateRight(sibling);
            sibling = node.parent.right;
          }
          this.addStep(`Rotate parent and fix colors.`, null);
          if (sibling) {
            sibling.color = node.parent.color;
            if (sibling.right) sibling.right.color = BLACK;
          }
          node.parent.color = BLACK;
          this.rotateLeft(node.parent);
          node = this.root;
        }
      } else {
        let sibling = node.parent.left;
        
        if (sibling && sibling.color === RED) {
          this.addStep(`Sibling is RED. Recolor and rotate.`, null);
          sibling.color = BLACK;
          node.parent.color = RED;
          this.rotateRight(node.parent);
          this.addStep(`Right rotation on parent. Sibling recolored.`, null);
          sibling = node.parent.left;
        }
        
        if (sibling && (!sibling.right || sibling.right.color === BLACK) && 
            (!sibling.left || sibling.left.color === BLACK)) {
          this.addStep(`Sibling and its children are BLACK. Recolor sibling RED.`, null);
          sibling.color = RED;
          node = node.parent;
        } else {
          if (sibling && (!sibling.left || sibling.left.color === BLACK)) {
            this.addStep(`Sibling's left child is BLACK. Rotate and recolor.`, null);
            if (sibling.right) sibling.right.color = BLACK;
            sibling.color = RED;
            this.rotateLeft(sibling);
            sibling = node.parent.left;
          }
          this.addStep(`Rotate parent and fix colors.`, null);
          if (sibling) {
            sibling.color = node.parent.color;
            if (sibling.left) sibling.left.color = BLACK;
          }
          node.parent.color = BLACK;
          this.rotateRight(node.parent);
          node = this.root;
        }
      }
    }
    if (node) node.color = BLACK;
    this.addStep(`Fixed all violations. Deletion complete.`, null);
  }
}