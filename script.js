document.getElementById('searchBtn').addEventListener('click', function () {
    const query = document.getElementById('searchInput').value.trim();

    if (!query) {
        alert('Please enter a university name.');
        return;
    }

    const url = 'http://universities.hipolabs.com/search?name=' + encodeURIComponent(query);
    const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);

    fetch(proxyUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const universities = JSON.parse(data.contents);
            const resultDiv = document.getElementById('results');
            resultDiv.innerHTML = '';

            if (universities.length === 0) {
                resultDiv.textContent = 'No universities found.';
                return;
            }

            universities.forEach(university => {
                const uniDiv = document.createElement('div');
                uniDiv.classList.add('university');

                uniDiv.innerHTML = `
                    <h3>${university.name}</h3>
                    <p><strong>Country:</strong> ${university.country}</p>
                    <p><strong>Website:</strong> <a href="${university.web_pages[0]}" target="_blank">${university.web_pages[0]}</a></p>
                `;

                resultDiv.appendChild(uniDiv);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('results').textContent = 'An error occurred while fetching data.';
        });
});
