function getInstance({
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
      var objectStore = db.createObjectStore(tableName, { keyPath: 'id' });
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
        read: ({
          id
        }) => {
          read({
            id,
            db,
            tableName
          })
        },
        readAll: ({
          tableName
        }) => {
          readAll({
            tableName
          })
        },
        readByIndex: ({
          tableName
        }) => {
          readByIndex({
            db,
            tableName
          })
        }
      }
      resolve(instance);
    };
  })
}

getInstance({
  databaseName: 'webassembly',
  tableName: 'person',
  version: 1
}).then((instance) => {
  instance.add({
    id: 1,
    data: { id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' }
  });
  add({
    id: 2,
    data: { id: 2, name: '张三2', age: 25, email: 'zhangsan2@example.com' }
  });
  // read data
  read({
    id: 1
  });
  // read({
  //   id: 2
  // });
  // // read data
  // readAll();
  // update({
  //   id: 1,
  //   data: {
  //     name: 'i张三',
  //     age: 124,
  //     email: 'izhangsan@example.com'
  //   }
  // });
}, (err) => {
})


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
  id
}) {
  var transaction = db.transaction(['person']);
  var objectStore = transaction.objectStore('person');
  var request = objectStore.get(id);

  request.onerror = function (event) {
    console.log('事务失败');
  };

  request.onsuccess = function (event) {
    if (request.result) {
      console.log('Name: ' + request.result.name);
      console.log('Age: ' + request.result.age);
      console.log('Email: ' + request.result.email);
    } else {
      console.log('未获得数据记录');
    }
  };
}


// read data list
function readAll() {
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
      console.log('没有更多数据了！');
    }
  };
}

function update({
  id,
  data
}) {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
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
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .delete(id);

  request.onsuccess = function (event) {
    console.log('数据删除成功');
  };
}

// remove();

function readByIndex({
  indexKey
}) {
  var transaction = db.transaction(['person'], 'readonly'); // 
  var store = transaction.objectStore('person');
  var index = store.index(indexKey);
  var request = index.get('李四');

  request.onsuccess = function (e) {
    var result = e.target.result;
    if (result) {
      // ...
    } else {
      // ...
    }
  }
}

