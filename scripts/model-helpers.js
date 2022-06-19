
function maxId(children) {
  let max = 0;
  children.forEach((child) => {
    if (typeof child === 'number') {
      max = Math.max(child, max);
    } else {
      max = Math.max(maxId(child.children), child.id, max);
    }
  });
  return max;
}

function nextId(store) {
  return maxId(store.projects) + 1;
}

function findChild(children, id) {
  for (const child of children) {
    if (typeof child === 'number') {
      continue;
    }
    if (child.id === id) {
      return child;
    }
    const decendant = findChild(child.children, id);
    if (decendant) {
      return decendant;
    }
  }
  return undefined;
}

function projectForId(store, id) {
  return findChild(store.projects, id);
}

module.exports = {
  nextId,
  projectForId
}
