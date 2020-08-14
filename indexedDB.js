var databaseName = 'webassembly';
var version = 1;
var request = window.indexedDB.open(databaseName, version);
request.onerror = function (event) {
    console.log('数据库打开报错');
};
var db;
request.onsuccess = function (event) {
  db = request.result;
  console.log('数据库打开成功');
};
var db;
request.onupgradeneeded = function (event) {
  db = event.target.result;
}

// upgrade version
request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore('person', { keyPath: 'id' });
}

// create index
request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore('person', { keyPath: 'id' });
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
  }



  function add() {
    var request = db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });
  
    request.onsuccess = function (event) {
      console.log('数据写入成功');
    };
  
    request.onerror = function (event) {
      console.log('数据写入失败');
    }
  }
  
  add();



function read() {
   var transaction = db.transaction(['person']);
   var objectStore = transaction.objectStore('person');
   var request = objectStore.get(1);

   request.onerror = function(event) {
     console.log('事务失败');
   };

   request.onsuccess = function( event) {
      if (request.result) {
        console.log('Name: ' + request.result.name);
        console.log('Age: ' + request.result.age);
        console.log('Email: ' + request.result.email);
      } else {
        console.log('未获得数据记录');
      }
   };
}

read();



function readAll() {
  var objectStore = db.transaction('person').objectStore('person');

   objectStore.openCursor().onsuccess = function (event) {
     var cursor = event.target.result;

     if (cursor) {
       console.log('Id: ' + cursor.key);
       console.log('Name: ' + cursor.value.name);
       console.log('Age: ' + cursor.value.age);
       console.log('Email: ' + cursor.value.email);
       cursor.continue();
    } else {
      console.log('没有更多数据了！');
    }
  };
}

// read data
readAll();
function update() {
    var request = db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });
  
    request.onsuccess = function (event) {
      console.log('数据更新成功');
    };
  
    request.onerror = function (event) {
      console.log('数据更新失败');
    }
  }
  
update();

function remove() {
    var request = db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .delete(1);
  
    request.onsuccess = function (event) {
      console.log('数据删除成功');
    };
  }
  
// remove();


var transaction = db.transaction(['person'], 'readonly');
var store = transaction.objectStore('person');
var index = store.index('name');
var request = index.get('李四');

request.onsuccess = function (e) {
  var result = e.target.result;
  if (result) {
    // ...
  } else {
    // ...
  }
}