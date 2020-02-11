let {document} = require('../persitence/sql/document');
let {corpus} = require('../persitence/sql/corpus');
let hashing = require('../persitence/hashing');
let fileManager = require('../persitence/filesystem/filemanager');

// TODO define error types for better returns in rest api.

async function listAll() {
    let documents = await document.findAll();
    if (documents) {
        for (let document of documents) { // TODO error handling when operations fail have way through...
            document.text = await fileManager.readFile(document.fileName);
        }
    }
    return documents;
}

async function get(id) {
    let doc = await document.findByPk(id);
    doc.text = await fileManager.readFile(doc.fileName);
}

async function create(item) {   // TODO make this a atomic transaction!
    if (item.id)
        item.id = undefined;
    if (!item.text)
        throw Error("no text specified");
    let hash = hashing.sha256Hash(item.text);
    let ts = Date.now();
    let corpus = await corpus.findByPk(item.c_id);
    let corpusDocuments = await corpus.getDocuments();
    for (let doc of corpusDocuments) {
        if (doc.document_hash === hash) throw Error("file content already present in this corpus");
    }
    let [document, created] = await document.findOrCreate({
        where: {
            fileName: item.fileName,
            document_hash: hash,
            last_edited: ts
        }
    });
    if (item.text) await fileManager.saveFile(document.filename, !created, item.text);
    document.text = item.text;
    return document;
}

async function del(id) {  // TODO make this a atomic transaction!
    let doc = await document.findByPk(id);
    await document.destroy({where: {d_id: id}});
    await fileManager.deleteFile(doc.fileName);
    return id;
}

async function update(id, item) {   // TODO make this a atomic transaction!
    if (item.id) {
        if (item.id !== id) {
            console.warn("request for item update has different ids, setting id to url param");
            item.id = id;
        }
    }
    let old_doc = await document.findByPk(id);
    let updatesArray = await document.update(item, {where: {d_id: id}});
    if (updatesArray && updatesArray.size === 1) {
        let new_doc = await document.findByPk(id);
        if (new_doc.fileName !== old_doc.fileName) await fileManager.moveFile(old_doc.fileName, new_doc.fileName);
        return new_doc;
    } else {
        throw Error("failed to updates items properly");
    }
}

module.exports = {
    listAll: listAll,
    getOne: get,
    updateOne: update,
    deleteOne: del,
    createOne: create,

};
