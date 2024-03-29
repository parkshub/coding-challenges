// https://www.youtube.com/watch?v=tWVWeAqZ0WU&list=PLYXTMeEw1oo90WpyT0bdT9y867mQvePBd&ab_channel=freeCodeCamp.org

const graph = {
    a: ['b', 'c'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: []
  }
  
// a ---> c
// |      |
// v      v
// b      e
// |
// v
// d ---> f

// try breadth first and depth first
// and try recursive function (breadth first wont work)
// breadth is queue and depth is stack
// breadth: acbedf
// depth: abdfce

// breadth first

  const breadthFirst = (source, graph) => {
    const queue = [ source ]
  
    while (queue.length > 0) {
      const current = queue.shift()
      console.log(current)
      
      for (let neighbor of graph[current]) {
        queue.push(neighbor)
      }
    }
  }
  
  const depthFirst = (source, graph) => {
    const stack = [ source ]
  
    while (stack.length > 0) {
      const current = stack.pop()
      console.log(current)
  
      for (let neighbor of graph[current]) {
        stack.push(neighbor)
      }
    }
  }
   
  const depthFirstRec = (source, graph) => {
    console.log(source)
  
    for (let neighbor of graph[source]) {
      depthFirstRec(neighbor, graph)
    }
  }

// acyclic = no cycles, meaning you can't get to the node you started from
// we also need a source node and a destination node


// acyclic directed has path problem

// f -- g -- h
// |  /
// i -- j
// |
// k
  
  
  const graph2 = {
    f: ['g','i'],
    g: ['h'],
    h: [],
    i: ['g','k'],
    j: ['i'],
    k: []
  }
  
  
  const hasPathDepthRec = (graph, src, dst) => {
    if (src === dst) { return true }
  
    for (let neighbor of graph[src]) {
      if (hasPathDepth(graph, neighbor, dst) === true) { return true }
    }
  
    return false
  }
  
  
  const hasPathDepth = (graph, src, dst) => {
    const stack = [ src ]
  
    while (stack.length) {
      const current = stack.pop()
      
      if (current === dst) { return true }
  
      for (let neighbor of graph[current]) {
        stack.push(neighbor)
      }
    }
  
    return false
  }
  
  const hasPathBreadth = (graph, src, dst) => {
    // can't do recursive
    const queue = [ src ]
  
    while(queue.length) {
      const current = queue.shift()
      if (current === dst) { return true }
  
      for (let neighbor of graph[current]) {
        queue.push(neighbor)
      }
    }
  
    return false
  }
  
  
// undirected graph
// if given just edges, convert into adjacency list

// try with edge below to determine if there is a path form a to b, for this problem, you only need to visit a node once to and record that it's been visited with a set
// need two helper functions 1) convert into adjacency list 2) check if a path exists
// use recursion

const edges = [
    ['i', 'j'],
    ['k', 'i'],
    ['m', 'k'],
    ['k', 'l'],
    ['o', 'n']
]

const buildGraph = (edges) => {
  const graph = {}

  for (let edge of edges) {
    const [a, b] = edge
    !graph[a] ? graph[a] = [b] : graph[a].push(b)
    !graph[b] ? graph[b] = [a] : graph[b].push(a)
  }

  return graph
}

// console.log(buildGraph(edges))

const hasPath = (graph, src, dst, visited) => {
  if (src === dst) { return true }
  if (visited.has(src)) { return false }

  visited.add(src)

  for (let neighbor of graph[src]) {
    if (hasPath(graph, neighbor, dst, visited) === true) {
      return true
    }
  }

  return false;
}

const undirectedPath = (edges, nodeA, nodeB) => {
  const graph = buildGraph(edges)
  return hasPath(graph, nodeA, nodeB, new Set())
}

// hasPath iterative solution
const hasPathIterative = (edges, src, dst, visited) => {
  // breadth traversal
  const graph = buildGraph(edges)
  const queue = [ src ]

  while (queue.length) {
      const current = queue.shift()
      
      if (current === dst) { return true }
      
      for (let neighbor of graph[current]) {
          if (visited.has(neighbor)) { continue }
          visited.add(neighbor)
          queue.push(neighbor)
      }
  }

  return false
}


// try with edges below to solve connected components count


const graph3 = {
  0: [8, 1, 5],
  1: [0],
  5: [0, 8],
  8: [0, 5],
  2: [3, 4],
  3: [2, 4],
  4: [3, 2]
}

// const graph3 = {
//   0: ['8', '1', '5'],
//   1: ['0'],
//   5: ['0', '8'],
//   8: ['0', '5'],
//   2: ['3', '4'],
//   3: ['2', '4'],
//   4: ['3', '2']
// }



// How many connected components?

const connectedComponentsCount = (graph) => {
  const visited = new Set()
  let count = 0

  for (let node in graph) {
    // console.log(visited)
    if (explore(graph, node, visited) === true) {
      count +=1
    }
  }

  return count
}

const explore = (graph, current, visited) => {
  if (visited.has(String(current))) return false;

  visited.add(String(current))

  for (let neighbor of graph[current]) {
    explore(graph, neighbor, visited) // this function returning false does not output a false for explore
    // during practice i got this part of the function wrong...
    // i put if explore === true return true which is wrong because the end of node will return true when we only want true when the function has traversed through the whole component
  }

  return true
}

// console.log(connectedComponentsCount(graph3))

const connectedComponentsCountIterative= (graph) => {
  const visited = new Set()
  let count = 0

  for (let node in graph) {

      if (visited.has(String(node))) { continue }

      const stack = [ node ]

      while (stack.length) {
          const current = stack.pop()

          for (let neighbor of graph[current]) {
              if (!visited.has(String(neighbor))) { 
                  visited.add(String(neighbor))
                  stack.push(neighbor)
              }
          }
      }

      count += 1
  }

  return count
}

// largest component
// NOT SURE WHY BUT IM GETTING 5, THE ANSWER SHOULD BE 4

const largestComponent = (graph) => {
  const visited = new Set()
  let longest = 0
  for (let node in graph) {
    const size = exploreSize(node, graph, visited)
    if (size > longest) { longest = size }
  }

  return longest
}

const exploreSize = (node, graph, visited) => {
  if (visited.has(String(node))) { return 0 }
  let size = 1
  visited.add(String(node))

  for (let neighbor of graph[node]) {
    size += exploreSize(neighbor, graph, visited)
  }

  return size
}

console.log(largestComponent(graph3))

// shortest path algorithm
// breadth first is ideal, think about why that is
// since we're doing breadth first, we do queue and cant do recursive

const edges2 = [
  ['w', 'x'],
  ['x', 'y'],
  ['z', 'y'],
  ['z', 'v'],
  ['w', 'v']
]

const shortest = (edges, nodeA, nodeB) => {
  const graph = buildGraph(edges)
  const visited = new Set([ nodeA ])

  const queue = [ [ nodeA, 0] ]

  while(queue.length) {
    const [ node, dist ] = queue.pop()
    if (node === nodeB) { return dist }

    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push([ neighbor, dist + 1 ])
      }
    }
  }

  return -1
}


console.log(shortest(graph))

// console.log(shortest(edges2, 'w', 'z'))


// number of islands
// for these problems the time and space complexity is
// O(r * c) where is row and c is column

const grid = [
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'L', 'W'],
  ['W', 'W', 'L', 'L', 'W'],
  ['L', 'W', 'W', 'L', 'L'],
  ['L', 'L', 'W', 'W', 'W'],
]

// if you put in any refence type objects into a set
// you won't be able to do set.has([a,b]) since it's going to check for reference equality

const islandCount = (grid) => {
  const visited = new Set()
  let count = 0

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (exploreIsland(grid, r, c, visited) === true) {
        count += 1
      }
    }
  }

  return count
}

const exploreIsland = (grid, r, c, visited) => {
  const rowInbounds = 0 <= r && r < grid.length
  const colInbounds = 0 <= c && c < grid[0].length
  if (!rowInbounds || !colInbounds) { return false }

  if (grid[r][c] === 'W') { return false }
  // last time i forgot to include this. think about why this would affect your code

  const pos = r + ',' + c

  if (visited.has(pos)) { return false }

  visited.add(pos)

  exploreIsland(grid, r + 1, c, visited)
  exploreIsland(grid, r - 1, c, visited)
  exploreIsland(grid, r, c + 1, visited)
  exploreIsland(grid, r, c - 1, visited)

  return true
}


// minimum island problem

const minimumIsland = (grid) => {
  let minimum = Infinity
  const visited = new Set()

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      let size = exploreIslandSize(graph, r, c, visited)
      if (size !== 0 && size < minimum) {
        minimum = size
      }
    }
  }

  return minimum
}

const exploreIslandSize = (graph, r, c, visited) => {
  

  if (r < 0 || r >= grid.length) { return 0 }
  if (c < 0 || c >= grid[0].length) { return 0 }
  if (grid[r][c] === 'W') { return 0 }

  const pos = r + ',' + c

  if (visited.has(pos)) { return 0 }

  visited.add(pos)

  let size = 1

  size += exploreIslandSize(graph, r - 1, c, visited)
  size += exploreIslandSize(graph, r + 1, c, visited)
  size += exploreIslandSize(graph, r, c - 1, visited)
  size += exploreIslandSize(graph, r, c + 1, visited)

  return size
}


const a = 
{
  "Version": "2000-01-01",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s2:::examplebucket/*"
      ]
    }
  ]
}