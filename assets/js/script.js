const fileList = document.getElementById('file-list');

async function loadFiles() {
    const response = await fetch('files/');
    const data = await response.json();

    data.forEach(item => {
        const li = document.createElement('li');
        const fileName = document.createElement('span');
        const fileSize = document.createElement('span');
        const downloadLink = document.createElement('a');

        fileName.textContent = item.name;
        fileName.classList.add('file-name');
        fileSize.textContent = (item.size / 1024).toFixed(2) + ' KB';
        fileSize.classList.add('file-size');
        downloadLink.href = 'files/' + item.name;
        downloadLink.textContent = 'Download';

        li.appendChild(fileName);
        li.appendChild(fileSize);
        li.appendChild(downloadLink);
        fileList.appendChild(li);
    });
}

loadFiles();
