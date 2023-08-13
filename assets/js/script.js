const fileList = document.getElementById('file-list');

async function loadFiles() {
    const repoOwner = 'abusayed0206'; // Replace with your GitHub username
    const repoName = 'cuet-ce-sessional-materials'; // Replace with your repository name
    const folderPath = 'files'; // Replace with the path to your 'files' folder

    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed: ${response.status}`);
        }
        
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
            downloadLink.href = item.download_url;
            downloadLink.textContent = 'Download';

            li.appendChild(fileName);
            li.appendChild(fileSize);
            li.appendChild(downloadLink);
            fileList.appendChild(li);
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

loadFiles();
