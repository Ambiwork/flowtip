import * as React from 'react';

import ResizeObserver from 'react-resize-observer';
import FlowTip, {TailProps} from 'flowtip-react-dom';
import {RectShape, Rect} from 'flowtip-core';
import {useDebouncedState, useId} from './util/react';

const triangles = {
  top: (
    <div
      style={{
        borderTop: '6px solid rgba(0,0,0,0.5)',
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
      }}
    />
  ),
  right: (
    <div
      style={{
        borderRight: '6px solid rgba(0,0,0,0.5)',
        borderTop: '6px solid transparent',
        borderBottom: '6px solid transparent',
      }}
    />
  ),
  bottom: (
    <div
      style={{
        borderBottom: '6px solid rgba(0,0,0,0.5)',
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
      }}
    />
  ),
  left: (
    <div
      style={{
        borderLeft: '6px solid rgba(0,0,0,0.5)',
        borderTop: '6px solid transparent',
        borderBottom: '6px solid transparent',
      }}
    />
  ),
};

const Tail = ({result}: TailProps) => triangles[result.region];

interface TooltipProps {
  showDelay?: number;
  hideDelay?: number;
  style?: React.CSSProperties;
  children?:
    | ((setTarget: (rect: RectShape) => void) => React.ReactNode)
    | React.ReactNode;
  content?: React.ReactNode;
  active?: boolean;
  draggable?: boolean;
}

const Tooltip: React.StatelessComponent<TooltipProps> = ({
  showDelay = 0,
  hideDelay = 500,
  style,
  children,
  active: staticActive,
  draggable,
  content,
}) => {
  const [active, setActive] = useDebouncedState(false);
  const [target, setTarget] = React.useState<RectShape | undefined>();

  const tooltipId = useId();

  const targetRef = React.useRef<HTMLSpanElement>(null);
  const targetResizeRef = React.useRef<ResizeObserver>(null);

  React.useEffect(() => {
    if (staticActive !== undefined) {
      return;
    }

    const handleMouseMove = (event: UIEvent) => {
      if (
        targetRef.current &&
        event.target instanceof Node &&
        targetRef.current.contains(event.target)
      ) {
        setActive(true, showDelay);
      } else {
        setActive(false, hideDelay);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [staticActive]);

  return (
    <span
      aria-describedby={tooltipId}
      style={
        typeof children === 'function'
          ? style
          : {position: 'relative', ...style}
      }
      ref={targetRef}
      draggable={draggable}
    >
      {typeof children === 'function' ? (
        children(setTarget)
      ) : (
        <>
          <ResizeObserver ref={targetResizeRef} onReflow={setTarget} />
          {children}
        </>
      )}

      {(staticActive || active) && (
        <FlowTip
          debug
          target={Rect.fromRect(target)}
          tail={Tail}
          tailOffset={8}
        >
          <div
            id={tooltipId}
            role="tooltip"
            style={{
              borderRadius: 8,
              background: 'rgba(0,0,0,0.5)',
              padding: '3px 8px',
              color: 'white',
              whiteSpace: 'nowrap',
            }}
          >
            {content}
          </div>
        </FlowTip>
      )}
    </span>
  );
};

export default React.memo(Tooltip);
