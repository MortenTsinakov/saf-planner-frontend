import { NEW_FRAGMENT_ID } from 'views/project/fragment-grid/FragmentGridConstants';

export const restrictOnlyFragments = ({
    active,
    transform,
    draggingNodeRect,
    containerNodeRect,
    windowRect,
}) => {
    if (!draggingNodeRect || !containerNodeRect || !windowRect || !active) {
        return transform
    }

    if (active && active.id === NEW_FRAGMENT_ID) {
        return restrictToBoundingRect(transform, draggingNodeRect, windowRect);
    }

    return restrictToBoundingRect(transform, draggingNodeRect, containerNodeRect);
}

function restrictToBoundingRect(transform, rect, boundingRect) {
    const value = {
      ...transform,
    };
  
    if (rect.top + transform.y <= boundingRect.top) {
      value.y = boundingRect.top - rect.top;
    } else if (
      rect.bottom + transform.y >=
      boundingRect.top + boundingRect.height
    ) {
      value.y = boundingRect.top + boundingRect.height - rect.bottom;
    }
  
    if (rect.left + transform.x <= boundingRect.left) {
      value.x = boundingRect.left - rect.left;
    } else if (
      rect.right + transform.x >=
      boundingRect.left + boundingRect.width
    ) {
      value.x = boundingRect.left + boundingRect.width - rect.right;
    }
  
    return value;
  }