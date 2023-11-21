const http = require('http'); // or 'https' for https:// URLs
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

//*
let arquivos = [
'http://ui-grid.info/docs/grunt-scripts/csv.js',
'http://ui-grid.info/docs/grunt-scripts/pdfmake.js',
'http://ui-grid.info/docs/grunt-scripts/vfs_fonts.js',
'http://ui-grid.info/docs/grunt-scripts/lodash.min.js',
'http://ui-grid.info/docs/grunt-scripts/jszip.min.js',
'http://ui-grid.info/docs/grunt-scripts/excel-builder.dist.js',
'http://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css',
'http://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js',
//'https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js'
];

let arquivos2 = [
    'https://cdn.jsdelivr.net/gh/angular-ui/bower-ui-grid/ui-grid.min.js',
    'https://cdn.jsdelivr.net/gh/angular-ui/bower-ui-grid/ui-grid.exporter.min.js',
    'https://cdn.jsdelivr.net/gh/angular-ui/bower-ui-grid/ui-grid.selection.min.js',
    'https://cdn.jsdelivr.net/gh/angular-ui/bower-ui-grid/ui-grid.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/danialfarid-angular-file-upload/12.2.13/ng-file-upload-shim.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/danialfarid-angular-file-upload/12.2.13/ng-file-upload-all.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/angular-flatpickr/3.6.6/ng-flatpickr.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-select/0.19.8/select.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-select/0.19.8/select.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.10.0/css/bootstrap-datepicker.standalone.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.10.0/js/bootstrap-datepicker.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.10.0/locales/bootstrap-datepicker.pt-BR.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.13/flatpickr.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.13/flatpickr.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.13/l10n/pt.min.js',
];
//*/
for(let i = 0; i < arquivos2.length;i++) {
    //console.log(arquivos[i]);
    let temp = arquivos2[i].split("/");
    let filename = temp[temp.length - 1];

    const file = fs.createWriteStream("./libs/"+filename);
    const request = https.get(arquivos2[i], function(response) {
        response.pipe(file);

        // after download completed close filestream
        file.on("finish", () => {
            file.close();
            console.log(filename + " Download Completed");
        });
    });
}
/*
let arquivo = arquivos[0];
console.log(arquivo);
    let temp = arquivo.split("/");
    console.log(temp);
    let filename = temp[temp.length - 1];
    console.log(filename);
//*/
/*

const file = fs.createWriteStream("file.jpg");
const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
   response.pipe(file);

   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       console.log("Download Completed");
   });
});
//*/