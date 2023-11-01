const createInitials = function (text) {
    if (!text) return "";
    if (text.length <= 2) return text;
    let parts = text.split(" ");
    let first = parts[0].charAt(0);
    let last = parts[parts.length - 1].charAt(0);
    return (first + last).toUpperCase();
};

const formatDateDMY = function(oldDate) {
    let temp = oldDate.substr(6, 2) + '/' + oldDate.substr(4, 2) + '/' + oldDate.substr(0, 4);
    return temp;
}

const gerarControleMudancaTemplate = function(dados) {
    const content = fs.readFileSync('modelo2.docx', 'binary');
    const zip = new PizZip(content);
    var doc;
    try {
        doc = new Docxtemplater(zip, {nullGetter() { return ''; }});
    } catch (error) {
        errorHandler(error);
    }
    doc.setData(dados);
    try {
        doc.render();
    } catch (error) {
        errorHandler(error);
    }
    let fileName = dados.numero_os+'.docx';
    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync('./output/'+dados.numero_os+'.docx', buf);
    console.log(`"${dados.numero_os}.docx" written to disk`);
    return fileName;
}

function errorHandler(error) {
  console.log(JSON.stringify({ error: error }, replaceErrxors));
  if (error.properties && error.properties.errors instanceof Array) {
    const errorMessages = error.properties.errors
      .map(function (error) {
        return error.properties.explanation;
      })
      .join('\n');
    console.log('errorMessages', errorMessages);
  }
  throw error;
}

module.exports = {
    createInitials,
    formatDateDMY,
    gerarControleMudancaTemplate
};