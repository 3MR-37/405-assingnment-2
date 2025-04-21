document.getElementById("searchButton").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value;
    const resultsDiv = document.getElementById("results");
  
    resultsDiv.innerHTML = "Loading...";
  
    fetch(`http://universities.hipolabs.com/search?name=${query}`)
      .then(response => response.json())
      .then(data => {
        resultsDiv.innerHTML = "";
        if (data.length === 0) {
          resultsDiv.innerHTML = "No universities found.";
          return;
        }
  
        data.forEach(university => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <strong>${university.name}</strong><br>
            Country: ${university.country}<br>
            <a href="${university.web_pages[0]}" target="_blank">Visit Website</a>
          `;
          resultsDiv.appendChild(card);
        });
      })
      .catch(error => {
        resultsDiv.innerHTML = "An error occurred. Please try again.";
        console.error(error);
      });
  });
