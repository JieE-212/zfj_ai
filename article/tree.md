数据结构树与二叉树详解（附 JavaScript 完整实操代码）
在数据结构中，树（Tree）是一种非常重要的非线性数据结构，区别于数组、链表等线性结构，树结构可以清晰表达数据的层级、从属关系。而二叉树（Binary Tree）是树结构中最基础、应用最广泛的分支，也是学习平衡树、红黑树、B+树等高级树形结构的核心基础。
本文将从零讲解树与二叉树的核心概念、分类、特性，并通过原生 JavaScript 实现二叉树的创建、遍历、查找、删除等核心操作，帮助大家彻底掌握树形数据结构。
一、树的基础概念
1.1 什么是树？
树是由n（n≥0） 个节点组成的有限集合，满足两个核心特性：
- 当 n=0 时，称为空树；
- 当 n>0 时，有且仅有一个根节点，其余节点分为若干个互不相交的有限集合，每个集合都是一棵独立的子树。
1.2 树的核心术语
为了方便后续学习，先掌握树的通用基础术语：
- 根节点：树的最顶层节点，无父节点，一棵树唯一；
- 父节点/子节点：直接相连的上下级节点，上层为父，下层为子；
- 叶子节点：没有子节点的终端节点；
- 节点度：一个节点拥有的子节点个数；
- 树的度：整棵树中所有节点的最大度；
- 树的深度/高度：从根节点到最远叶子节点的层级数。
二、二叉树核心知识
二叉树是度最大为2的有序树，是树结构的特例，也是编程中最常用的树形结构。它的每个节点最多只能有两个子节点，分别称为左子节点和右子节点，左右顺序不可颠倒。
2.1 二叉树的五大形态
1. 空二叉树：无任何节点；
2. 只有根节点的二叉树；
3. 只有左子树的二叉树；
4. 只有右子树的二叉树；
5. 左右子树俱全的完整二叉树。
2.2 两种特殊二叉树
（1）满二叉树
每一层的节点数都达到最大值，所有叶子节点都在同一层，除叶子节点外，所有节点都有两个子节点。
（2）完全二叉树
除最后一层外，其余层节点全部满员，且最后一层的节点全部靠左排列。满二叉树一定是完全二叉树，但完全二叉树不一定是满二叉树。
2.3 二叉树核心性质
- 二叉树第 i 层（i≥1）最多有$$2^{i-1}$$ 个节点；
- 深度为 k 的二叉树，最多有 $$2^k -1$$ 个节点；
- 任意二叉树中，度为0的叶子节点数 = 度为2的节点数 + 1。
三、JavaScript 实现二叉树
JavaScript 中没有内置的二叉树结构，我们可以通过面向对象的方式自定义节点类和二叉树类，实现树的创建、遍历、查询等核心操作。
3.1 定义二叉树节点
每个二叉树节点包含三个属性：节点值、左子节点、右子节点，默认左右子节点为空。
// 定义二叉树节点类
class TreeNode {
  constructor(value) {
    this.value = value; // 节点值
    this.left = null;   // 左子节点
    this.right = null;  // 右子节点
  }
}

3.2 定义二叉树类与初始化
二叉树以根节点为入口，默认初始化为空树，同时提供节点插入方法，快速构建二叉树。
// 定义二叉树类
class BinaryTree {
  constructor() {
    this.root = null; // 根节点，初始为空树
  }

  // 插入节点（按层级插入，构建完全二叉树）
  insert(value) {
    const newNode = new TreeNode(value);
    // 空树，直接设置为根节点
    if (!this.root) {
      this.root = newNode;
      return;
    }

    // 队列实现层级插入
    const queue = [this.root];
    while (queue.length) {
      const current = queue.shift();
      // 优先插入左子节点
      if (!current.left) {
        current.left = newNode;
        return;
      }
      // 再插入右子节点
      if (!current.right) {
        current.right = newNode;
        return;
      }
      // 左右节点都存在，入队继续遍历
      queue.push(current.left);
      queue.push(current.right);
    }
  }
}

3.3 二叉树核心遍历方式（重点）
遍历是二叉树最核心的操作，分为深度优先遍历（DFS）和广度优先遍历（BFS），其中深度优先又包含前序、中序、后序三种遍历。
遍历规则（根节点优先级）：
- 前序遍历：根 → 左 → 右
- 中序遍历：左 → 根 → 右
- 后序遍历：左 → 右 → 根
- 层序遍历（广度优先）：从上到下、从左到右逐层遍历
在 BinaryTree 类中新增遍历方法：
// 前序遍历
preOrder(node = this.root, result = []) {
  if (!node) return result;
  result.push(node.value); // 先访问根
  this.preOrder(node.left, result); // 遍历左子树
  this.preOrder(node.right, result); // 遍历右子树
  return result;
}

// 中序遍历
inOrder(node = this.root, result = []) {
  if (!node) return result;
  this.inOrder(node.left, result); // 遍历左子树
  result.push(node.value); // 访问根
  this.inOrder(node.right, result); // 遍历右子树
  return result;
}

// 后序遍历
postOrder(node = this.root, result = []) {
  if (!node) return result;
  this.postOrder(node.left, result); // 遍历左子树
  this.postOrder(node.right, result); // 遍历右子树
  result.push(node.value); // 访问根
  return result;
}

// 层序遍历（广度优先）
levelOrder() {
  if (!this.root) return [];
  const result = [];
  const queue = [this.root];
  while (queue.length) {
    const current = queue.shift();
    result.push(current.value);
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
  return result;
}

3.4 拓展：节点查找与树的深度计算
新增常用工具方法，实现节点值查找、二叉树最大深度计算：
// 查找指定值的节点
find(value, node = this.root) {
  if (!node) return null;
  if (node.value === value) return node;
  // 递归查找左子树
  const leftFind = this.find(value, node.left);
  if (leftFind) return leftFind;
  // 递归查找右子树
  return this.find(value, node.right);
}

// 计算二叉树最大深度
getDepth(node = this.root) {
  if (!node) return 0;
  // 左右子树最大深度 + 当前节点层级
  return Math.max(this.getDepth(node.left), this.getDepth(node.right)) + 1;
}

四、完整测试示例
整合所有代码，创建二叉树并测试所有方法，直观验证运行结果：
// 1. 创建二叉树实例
const tree = new BinaryTree();

// 2. 插入节点
[1, 2, 3, 4, 5, 6].forEach(item => tree.insert(item));

// 3. 各类遍历测试
console.log("前序遍历：", tree.preOrder()); // [1,2,4,5,3,6]
console.log("中序遍历：", tree.inOrder()); // [4,2,5,1,6,3]
console.log("后序遍历：", tree.postOrder()); // [4,5,2,6,3,1]
console.log("层序遍历：", tree.levelOrder()); // [1,2,3,4,5,6]

// 4. 查找节点
console.log("查找节点5：", tree.find(5));

// 5. 获取树的深度
console.log("树的最大深度：", tree.getDepth()); // 3

五、二叉树的实际应用场景
树形结构在前端、后端算法中应用极其广泛，常见场景如下：
- 前端组件树：DOM 文档对象模型本质就是一棵多叉树，节点嵌套关系完全贴合树结构；
- 菜单/目录结构：系统侧边栏菜单、电脑文件目录，层级从属关系由树结构实现；
- 算法优化：二叉搜索树用于快速查找、排序，平衡二叉树、红黑树用于优化数据增删查效率；
- 数据压缩：哈夫曼树用于文件压缩、编码优化。
六、总结
1. 树是非线性层级数据结构，二叉树是每个节点最多两个子节点的有序树，是树形结构的基础；
2. 二叉树核心操作围绕四种遍历展开，前/中/后序为深度优先，层序为广度优先，是算法刷题的高频考点；
3. JavaScript 可通过面向对象方式灵活实现二叉树，核心是节点的递归遍历和队列层级操作；
4. 掌握二叉树是学习高级树形结构、理解层级数据、优化查找算法的关键。