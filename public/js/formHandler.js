
    document.addEventListener('DOMContentLoaded', (event) => {
        const fileInput = document.getElementById('image');
        const fileNameSpan = document.getElementById('file-name');
        
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                fileNameSpan.textContent = fileInput.files[0].name;
            } else {
                fileNameSpan.textContent = 'Choose image...';
            }
        });
    });

