const books = [
    {
      id: 1,
      category: 'personal development',
      title: "The Wealth Money Can't Buy",
      author: "Robin Sharma",
      year: 2023,
      sample: "🧠 A guide to inner success, peace, and authentic leadership.",
      available: true
    },
    {
      id: 2,
      category: 'romance',
      title: "Romeo and Juliet",
      author: "William Shakespeare",
      year: 1597,
      sample: "💘 With love’s light wings did I o’er-perch these walls...",
      available: true
    },
    {
      id: 3,
      category: 'biography',
      title: "Shoe Dog",
      author: "Phil Knight",
      year: 2016,
      sample: "👟 The journey of the Nike co-founder, full of grit and inspiration.",
      available: true
    }
  ];
  
  // 💡 Apply styles dynamically (CSS replaced)
  function applyStyles() {
    document.body.style.cssText = `
      font-family: 'Segoe UI', sans-serif;
      background-image: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80');
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-position: center;
      color: #333;
      margin: 0;
      padding: 20px;
      text-align: center;
    `;
  
    const container = document.querySelector('.container');
    container.style.cssText = `
      max-width: 800px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `;
  
    document.querySelectorAll('input, select').forEach(el => {
      el.style.cssText = `
        width: 100%;
        padding: 10px;
        margin: 10px 0 20px;
        border-radius: 6px;
        border: 1px solid #ccc;
        font-size: 1rem;
      `;
    });
  
    document.querySelectorAll('button').forEach(btn => {
      btn.style.cssText += `
        padding: 10px;
        margin: 5px;
        background: #333;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      `;
    });

    // Style search label if present
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
    label.style.cssText = `
        display: block;
        text-align: left;
        margin: 10px 0 5px;
        font-weight: bold;  
    `;
    });
  
    // 📌 Footer Styling
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.cssText = `
        background-color: #333;
        color: white;
        padding: 20px;
        margin-top: 40px;
        text-align: center;
        border-top: 4px solid #ccc;
        box-shadow: 0 -2px 6px rgba(0,0,0,0.2);
      `;
  
      const footerText = footer.querySelector('p');
      if (footerText) {
        footerText.style.margin = '0';
        footerText.style.fontSize = '0.9rem';
      }
    }
  }
  
  // 📖 Display books
  function displayBooks(filtered = books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
  
    if (filtered.length === 0) {
      bookList.innerHTML = '<p>No books found.</p>';
      return;
    }
  
    filtered.forEach(book => {
      const div = document.createElement('div');
      div.style.cssText = `
        text-align: left;
        margin-bottom: 30px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #fafafa;
      `;
  
      const title = document.createElement('h2');
      title.textContent = book.title;
  
      const author = document.createElement('p');
      author.innerHTML = `<strong>Author:</strong> ${book.author}`;
  
      const year = document.createElement('p');
      year.innerHTML = `<strong>Year:</strong> ${book.year}`;
  
      const sample = document.createElement('p');
      sample.textContent = book.sample;
      sample.style.cssText = "font-style: italic; color: #666; margin-top: 10px;";
  
      const borrowBtn = document.createElement('button');
      borrowBtn.textContent = book.available ? "📖 Borrow Book" : "❌ Not Available";
      borrowBtn.disabled = !book.available;
      borrowBtn.onclick = () => borrowBook(book.id);
  
      const returnBtn = document.createElement('button');
      returnBtn.textContent = "🔁 Return Book";
      returnBtn.disabled = book.available;
      returnBtn.onclick = () => returnBook(book.id);
  
      div.append(title, author, year, sample, borrowBtn, returnBtn);
      bookList.appendChild(div);
    });
  }
  
  // 🔍 Filter books
  function filterBooks() {
    const category = document.getElementById('category').value;
    const search = document.getElementById('searchBox').value.toLowerCase();
  
    const filtered = books.filter(book =>
      (category === '' || book.category === category) &&
      (book.title.toLowerCase().includes(search))
    );
  
    displayBooks(filtered);
  }
  
  // 📚 Borrow
  function borrowBook(id) {
    const book = books.find(b => b.id === id);
    if (book && book.available) {
      book.available = false;
      alert(`You borrowed "${book.title}"`);
      filterBooks();
    }
  }
  
  // 🔁 Return
  function returnBook(id) {
    const book = books.find(b => b.id === id);
    if (book && !book.available) {
      book.available = true;
      alert(`You returned "${book.title}"`);
      filterBooks();
    }
  }
  
  // 📱 JavaScript Media Query for responsiveness
  function applyResponsiveStyles() {
    const smallPhone = window.matchMedia("(max-width: 480px)");
    const tablet = window.matchMedia("(max-width: 768px)");
    const largeScreen = window.matchMedia("(min-width: 1200px)");
  
    const container = document.querySelector('.container');
    const h1 = document.querySelector("h1");
  
    if (smallPhone.matches) {
      document.body.style.padding = "10px";
      container.style.padding = "20px";
      h1.style.fontSize = "1.5rem";
    } else if (tablet.matches) {
      container.style.padding = "25px";
    } else if (largeScreen.matches) {
      container.style.maxWidth = "1000px";
    } else {
      document.body.style.padding = "20px";
      container.style.padding = "30px";
      h1.style.fontSize = "2rem";
    }
  }
  
  // 🧠 Add & Remove Extra Message
  function addNotice() {
    if (!document.getElementById("notice")) {
      const notice = document.createElement("p");
      notice.id = "notice";
      notice.textContent = "📢 This is a dynamically added message!";
      notice.style.color = "blue";
      notice.style.marginTop = "20px";
      document.querySelector(".container").appendChild(notice);
    }
  }
  
  function removeNotice() {
    const notice = document.getElementById("notice");
    if (notice) notice.remove();
  }
  
  // 🏁 Initial render
  window.onload = () => {
    applyStyles();
    displayBooks();
    applyResponsiveStyles();
  
    // Watch for screen size changes
    window.addEventListener("resize", applyResponsiveStyles);
  
    // Add buttons for add/remove notice
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add Notice";
    addBtn.onclick = addNotice;
  
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Notice";
    removeBtn.onclick = removeNotice;
  
    const container = document.querySelector(".container");
    container.appendChild(addBtn);
    container.appendChild(removeBtn);
  };
  