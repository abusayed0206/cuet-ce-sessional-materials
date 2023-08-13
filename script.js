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
            const tr = document.createElement('tr');
            const iconCell = document.createElement('td');
            const nameCell = document.createElement('td');
            const sizeCell = document.createElement('td');
            const downloadCell = document.createElement('td');

            const icon = document.createElement('i');
            icon.classList.add('fas');

            const fileName = document.createElement('span');
            fileName.textContent = item.name;
            fileName.classList.add('file-name');

            const fileSizeKB = (item.size / 1024).toFixed(2); // Calculate fileSizeKB

            const fileSize = document.createElement('span');
            fileSize.textContent = `${convertToBengaliNumber(fileSizeKB)} কেবি`;
            fileSize.classList.add('file-size');

            // Determine icon class based on file extension
            const fileExtension = item.name.split('.').pop().toLowerCase();
            if (fileExtension === 'pdf') {
                icon.classList.add('fa-file-pdf');
            } else if (fileExtension === 'doc' || fileExtension === 'docx') {
                icon.classList.add('fa-file-word');
            } else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
                icon.classList.add('fa-file-excel');
            } else if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
                icon.classList.add('fa-file-image');
            } else {
                icon.classList.add('fa-file'); // Default icon
            }

            const downloadLink = document.createElement('a');
            downloadLink.href = item.download_url;
            downloadLink.textContent = 'ধন্যবাদ সাঈদ';

            iconCell.appendChild(icon);
            nameCell.appendChild(fileName);
            sizeCell.appendChild(fileSize);
            downloadCell.appendChild(downloadLink);

            tr.appendChild(iconCell);
            tr.appendChild(nameCell);
            tr.appendChild(sizeCell);
            tr.appendChild(downloadCell);

            fileList.appendChild(tr);
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function convertToBengaliNumber(number) {
    const bengaliNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number.toString().replace(/\d/g, digit => bengaliNumbers[parseInt(digit)]);
}


function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    alert('পাসওয়ার্ড কপি হয়ে গেছে ব্রো। পাসওয়ার্ড টা হচ্ছেঃ' + text);
}



loadFiles();
