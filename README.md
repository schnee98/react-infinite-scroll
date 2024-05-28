# @schnee/react-infinite-scroll

A simple custom hook for implementing infinite scroll functionality using the Intersection Observer API.
<br>
This custom hook's special feature is that **it immediately unobserves** the intersected entry when the Intersection Observer's callback is executed.

## Installation

Install the package via npm:

```bash
npm install @schnee/react-infinite-scroll
```

## Usage

Here is how to use the `useInfiniteScroll` custom hook in your React project:

```javascript
import { useEffect, useRef, useCallback } from 'react';
import useInfiniteScroll from '@schnee/react-infinite-scroll';

const InfiniteScrollComponent = () => {
  const loadMoreRef = useRef(null);

  const handleLoadMore = useCallback(() => {
    // Define your logic to load more items here
  }, []);

  const { observe } = useInfiniteScroll(handleLoadMore);

  useEffect(() => {
    if (loadMoreRef.current) {
      observe(loadMoreRef.current);
    }
  }, [observe]);

  return (
    <div>
      {/* Your content here */}
    </div>
  );
};

export default InfiniteScrollComponent;
```

## API

### useInfiniteScroll(callback: Function)

`useInfiniteScroll` is a custom hook that accepts a callback function to be executed when the target element intersects with the viewport.

**Parameters:**

- `callback` (Function): The function to be called when the target element intersects with the viewport.

**Returns:**

- `observe` (Function): A function to observe the target element. It accepts an HTML element as a parameter.

## Example

Here is a complete example demonstrating how to use the `useInfiniteScroll` hook:

```javascript
import { useState, useEffect, useRef, useCallback } from 'react';
import useInfiniteScroll from '@schnee/react-infinite-scroll';

const sendRequestByPage = async (page) => {
  try {
    const response = await fetch(`http://example.com?page=${page}`);

    if (!response.ok) throw new Error("Request Failed");

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

const ExampleComponent = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const loadMoreRef = useRef(null);

  const loadMoreItems = useCallback(async () => {
    const nextPage = page + 1;
    const newItems = await sendRequestByPage(nextPage);

    if (newItems) {
      setItems((prevItems) => [...prevItems, ...newItems]);
      setPage(nextPage);
    }
  }, [page]);

  const { observe } = useInfiniteScroll(loadMoreItems);

  useEffect(() => {
    if (loadMoreRef.current) {
      observe(loadMoreRef.current);
    }
  }, [observe]);

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>Item {index + 1}</div>
      ))}
    </div>
  );
};

export default ExampleComponent;
```

In this example, the `ExampleComponent` loads more items when the last element of `items` intersects with the viewport.