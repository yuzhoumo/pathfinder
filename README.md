# Pathfinder: Design Document

A visualizer for various pathfinding algorithms

## Components

### Node

**Description:** Represents a square on the grid. This component is for display
purposes _only_ and should not contain any logic beyond taking in props to
change its own CSS styles based on its visual type. Mouse interaction function
side effects are handled higher in the hierarchy (in this case, the grid).

**Props:**

- type: `ENUM {'empty', 'source', 'target', 'wall', 'path', 'visited'}`
- row: `Integer` row index on the grid
- col: `Integer` column index on the grid
- onMouseDown: `Function`
- onMouseUp: `Function`
- onMouseEnter: `Function`

**Visual Types:**

- empty: default display type
- source: indicates the starting node
- target: indicates the destination for the pathfinding algorithm
- wall: indicates a wall; cannot be crossed by a path
- path: highlights the chosen path between the source and target nodes
- visited: indicates a node that has been visited by the pathfinding algorithm

**Color code:**

- empty: white
- source: green (triangle icon)
- target: red (target icon)
- wall: purple
- path: yellow
- visited: cyan

### Grid

**Description:** Wrapper for Node components. Displays nodes in a grid.

**Props:**

- nodes: `Node[][]` 2D array of node components

## Containers

### Visualizer

**Description:** Main container for the pathfinding visualizer. Controls the
rendering of grid nodes and handles user interaction with the grid.
