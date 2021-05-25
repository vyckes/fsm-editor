import { getSmoothStepPath } from 'react-flow-renderer';

const hPair = ['left', 'right'];
const vPair = ['bottom', 'top'];

export default function TransitionEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}) {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  let x, y;

  if (
    (hPair.includes(sourcePosition) && hPair.includes(targetPosition)) ||
    (vPair.includes(sourcePosition) && vPair.includes(targetPosition))
  ) {
    x = sourceX + (targetX - sourceX) / 2;
    y = sourceY + (targetY - sourceY) / 2 - 12;
  } else if (vPair.includes(sourcePosition)) {
    x = sourceX;
    y = targetY - 12;
  } else {
    x = targetX;
    y = sourceY - 12;
  }

  return (
    <>
      <path
        id={id}
        style={{ stroke: '#19232a', strokeWidth: '2' }}
        markerEnd="url(#arrow)"
        className="react-flow__edge-path"
        d={edgePath}
      />
      <foreignObject x={x} y={y} style={{ overflow: 'visible' }}>
        <div className="edge | flex-col items-center">
          <span
            className={`text-gray-100 radius-2 px-000 text-000 ${
              selected ? 'bg-blue' : 'bg-gray-400'
            }`}>
            {data.label}
          </span>
          {data.guard && (
            <span
              className={`${
                selected ? 'text-blue' : 'text-gray-400'
              } text-000 bg-gray-100 px-000 radius-2`}>
              [{data.guard}]
            </span>
          )}
        </div>
      </foreignObject>
      <defs>
        <marker
          id="arrow"
          markerWidth="25"
          markerHeight="25"
          viewBox="-20 -20 40 40"
          orient="auto">
          <polyline
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            fill="#19232a"
            points="-10,-8 1,0 -10,8 -10,-8"
          />
        </marker>
      </defs>
    </>
  );
}