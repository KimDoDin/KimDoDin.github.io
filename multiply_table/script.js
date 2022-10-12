let target = document.getElementById('target');
let form = document.querySelector('form')

form.addEventListener('submit', function(e){
    e.preventDefault();
    let columnNum = parseInt(form.columns.value),
        rowNum = parseInt(form.rows.value)
    if (columnNum && rowNum) {
        target.innerHTML = ''
        let table = document.createElement('table');
        for (let i=1; i <= rowNum; i++) {
            let rowNode = document.createElement('tr');
            for (let j=1; j<=columnNum; j++) {
                let columnNode = document.createElement('td');
                columnNode.textContent = i * j;
                rowNode.appendChild(columnNode);
            }
            table.appendChild(rowNode);
        }
        target.appendChild(table)
    } else {
        alert('Invalid input')
    }
});