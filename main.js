
getInstance({
    databaseName: 'webassembly',
    tableName: 'person',
    version: 1
}).then(async (instance) => {
    instance.add({
        id: 1,
        data: { id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' }
    });
    instance.add({
        id: 2,
        data: { id: 2, name: '张三2', age: 25, email: 'zhangsan2@example.com' }
    });
    // read data
    let readResult = await instance.read({
        id: 1
    });

    console.log('readResult:', readResult);
    // // read data
    let readAllResult = await readAll({
    });
    console.log('readAllResult:', readAllResult);
    instance.update({
        id: 1,
        data: {
            name: 'i张三',
            age: 124,
            email: 'izhangsan@example.com'
        }
    });

    let readByIndexResult = await instance.readByIndex({
        indexKey: 'name',
        indexValue: 'i张三'
    })
    console.log('readIndexResult:', readByIndexResult);
}, (err) => {
    // 
})
