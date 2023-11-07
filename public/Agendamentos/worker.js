self.addEventListener('message', function (e) {
    console.log(e);
    self.postMessage(e.data);
}, true);