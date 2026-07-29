const DB_NAME = 'NiharTravelGalleryDB';
const DB_VERSION = 1;
const STORE_NAME = 'memories';

/**
 * Initializes the IndexedDB database.
 */
export function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

/**
 * Gets all memories stored in IndexedDB.
 */
export async function getAllMemories() {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result || []);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

/**
 * Adds a new memory or list of memories to IndexedDB.
 */
export async function addMemory(memory) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(memory);

    request.onsuccess = () => {
      resolve(memory.id);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

/**
 * Updates an existing memory in IndexedDB.
 */
export async function updateMemory(memory) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(memory);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

/**
 * Deletes a memory from IndexedDB by ID.
 */
export async function deleteMemory(id) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

/**
 * Saves a list of memories (replaces all existing ones or merges them).
 * Used for importing backup data.
 */
export async function saveAllMemories(memories) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // Clear first
    const clearRequest = store.clear();
    clearRequest.onerror = (event) => reject(event.target.error);
    
    clearRequest.onsuccess = () => {
      let completed = 0;
      if (memories.length === 0) {
        resolve();
        return;
      }
      
      memories.forEach((memory) => {
        const request = store.put(memory);
        request.onerror = (event) => reject(event.target.error);
        request.onsuccess = () => {
          completed++;
          if (completed === memories.length) {
            resolve();
          }
        };
      });
    };
  });
}
