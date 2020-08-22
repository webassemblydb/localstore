function getInstance({
  autoIncrement,
  databaseName,
  tableName,
  version
}) {
  return new Promise(function (resolve, reject) {
    // var databaseName = 'webassembly';
    // var version = 1;
    var request = window.indexedDB.open(databaseName, version);
    request.onerror = function (event) {
      console.log('数据库打开报错');
    };
    request.onupgradeneeded = function (event) {
      db = event.target.result;
      var objectStore;
      if (autoIncrement) {
        objectStore = db.createObjectStore(tableName, { autoIncrement: true });
      } else  {
        objectStore = db.createObjectStore(tableName, { keyPath: 'id' });
      }
      // create index for name
      objectStore.createIndex('name', 'name', { unique: false });
      // create index for emali
      objectStore.createIndex('email', 'email', { unique: true });
    }
    request.onsuccess = function (event) {
      db = request.result;
      console.log('数据库打开成功');
      // add data
      let instance = {
        add: ({
          id,
          data
        }) => {
          add({
            id,
            db,
            data,
            tableName
          })
        },
        update: ({
          id,
          data
        }) => {
          update({
            id,
            db,
            data,
            tableName
          })
        },
        read: async ({
          id
        }) => {
          let result = await read({
            id,
            db,
            tableName
          })
          return result;
        },
        readAll: async ({
        }) => {
          let result = await readAll({
            db,
            tableName
          })
          return result;
        },
        readByIndex: async ({
          tableName,
          indexKey,
          indexValue
        }) => {
          let result = await readByIndex({
            db,
            indexKey,
            indexValue,
            tableName
          })
          return result;
        }
      }
      resolve(instance);
    };
  })
}

window.getInstance = getInstance

// add method
function add({
  db,
  id,
  data,
  tableName
}) {
  var request = db.transaction([tableName], 'readwrite')
    .objectStore(tableName)
    .add({
      id,
      ...data
    });

  request.onsuccess = function (event) {
    console.log('数据写入成功');
  };

  request.onerror = function (event) {
    console.log(event.currentTarget.error.message);
    console.log('数据写入失败');
  }
  // return db;
}

// read data
function read({
  tableName,
  db,
  id
}) {
  return new Promise((resolve, reject) => {
    var transaction = db.transaction([tableName]);
    var objectStore = transaction.objectStore(tableName);
    var request = objectStore.get(id);
    request.onerror = function (event) {
      console.log('事务失败');
    };

    request.onsuccess = function (event) {
      if (request.result) {
        console.log(request.result)
        resolve(request.result);
      } else {
        console.log('未获得数据记录');
      }
    };
  })
}


// read data list
function readAll() {
  return new Promise((resolve, reject) => {
    var queryResult = [];
    var objectStore = db.transaction('person').objectStore('person');
    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        //  console.log('Id: ' + cursor.key);
        //  console.log('Name: ' + cursor.value.name);
        //  console.log('Age: ' + cursor.value.age);
        //  console.log('Email: ' + cursor.value.email);
        queryResult.push({
          id: cursor.key,
          name: cursor.value.name,
          age: cursor.value.age,
          Email: cursor.value.email
        });
        cursor.continue();
      } else {
        console.log(queryResult);
        resolve(queryResult)
        console.log('没有更多数据了！');
      }
    };

  })
}

function update({
  db,
  id,
  tableName,
  data
}) {
  var request = db.transaction([tableName], 'readwrite')
    .objectStore(tableName)
    .put({
      id,
      ...data
    });

  request.onsuccess = function (event) {
    console.log('数据更新成功');
  };

  request.onerror = function (event) {
    console.log('数据更新失败');
  }
}

// remove data
function remove({
  id
}) {
  var request = db.transaction([tableName], 'readwrite')
    .objectStore(tableName)
    .delete(id);

  request.onsuccess = function (event) {
    console.log('数据删除成功');
  };
}

// remove();
function readByIndex({
  indexKey,
  indexValue
}) {
  return new Promise((resolve, reject) => {
    var transaction = db.transaction(['person'], 'readonly'); // 
    var store = transaction.objectStore('person');
    var index = store.index(indexKey);
    var request = index.get(indexValue);
    request.onsuccess = function (e) {
      var result = e.target.result;
      if (result) {
        console.log('Name: ' + result.name);
        console.log('Age: ' + result.age);
        console.log('Email: ' + result.email);
        resolve(result);
        // ...
      } else {
        // ...
      }
    }

  })
}
