// 数组转树的工具函数
function arrayToTree(arr, rootId = null) {
 

  return tree;
}

// 测试用例
function runTests() {
  // 测试1：基础正常结构（三级嵌套）
  const test1 = [
    { id: 1, name: '根节点', parentId: null },
    { id: 4, name: '孙节点1', parentId: 2 },
    { id: 2, name: '子节点1', parentId: 1 },
    { id: 3, name: '子节点2', parentId: 1 },
  ];
  const result1 = arrayToTree(test1);
  const res = [
    { id: 1, name: '根节点', parentId: null,children: [
        { id: 2, name: '子节点1', parentId: 1,children: [
            { id: 4, name: '孙节点1', parentId: 2 }
        ] },
    { id: 3, name: '子节点2', parentId: 1 },
    ] },
  ]


  // 测试2：多个根节点（parentId都为null）
  const test2 = [
    { id: 1, name: '根1', parentId: null },
    { id: 2, name: '根2', parentId: null },
    { id: 3, name: '子节点', parentId: 1 },
  ];
  const result2 = arrayToTree(test2);


  // 测试3：空数组
  const test3 = [];
  const result3 = arrayToTree(test3);
  console.assert(result3.length === 0, '测试3失败：空数组');

  // 测试4：单节点（根节点）
  const test4 = [{ id: 1, name: '唯一节点', parentId: null }];
  const result4 = arrayToTree(test4);
  console.assert(
    result4.length === 1 && 
    result4[0].id === 1 && 
    result4[0].children.length === 0,
    '测试4失败：单节点'
  );

  // 测试5：存在无效父节点（parentId不存在于id列表中）
  const test5 = [
    { id: 1, name: '根节点', parentId: null },
    { id: 2, name: '无效子节点', parentId: 999 }, // 父节点不存在
  ];
  const result5 = arrayToTree(test5);
  console.assert(
    result5.length === 1 &&  // 只有根节点
    result5[0].id === 1,
    '测试5失败：存在无效父节点'
  );

  // 测试6：节点顺序打乱（子节点在父节点之前）
  const test6 = [
    { id: 3, name: '孙节点', parentId: 2 },
    { id: 2, name: '子节点', parentId: 1 },
    { id: 1, name: '根节点', parentId: null },
  ];
  const result6 = arrayToTree(test6);
  console.assert(
    result6[0].children[0].children[0].id === 3,
    '测试6失败：节点顺序打乱'
  );

  // 测试7：自定义根节点标识（非null，如0）
  const test7 = [
    { id: 1, name: '根节点', parentId: 0 },
    { id: 2, name: '子节点', parentId: 1 },
  ];
  const result7 = arrayToTree(test7, 0); // 指定根节点parentId为0
  console.assert(
    result7.length === 1 && result7[0].id === 1,
    '测试7失败：自定义根节点标识'
  );

  console.log('所有测试通过！');
}

// 执行测试
runTests();
