//GESTIONE ACCOUNT
var myAccount = localStorage.getItem("account");

function settingAccountProperty() {
  //scrittura iniziali nel cerchio
  let accountCircle = document.getElementById("account-circle");
  if (myAccount === null) return;

  fetch("json/contatti.json")
    .then((response) => {
      if (!response.ok) {
        console.error("ERRORE NELLA LETTURA DEL FILE JSON -> ACCOUNT");
        return;
      }
      return response.json();
    })
    .then((jsonData) => {
      jsonData.contatti.forEach((customer) => {
        let firstLetter = customer.nome.charAt(0);
        let secondLetter = customer.cognome.charAt(0);
        accountCircle.innerHTML = firstLetter + secondLetter;

        document.getElementById("general-info-visible").style.display = "flex";
        //Inserimento informazioni
        document.getElementById("account-info-greeting").innerHTML =
          "Hi, " + customer.nome + "!";

        //scrittura ulteriori info
        document.getElementById("name").innerHTML =
          customer.nome + " " + customer.cognome;

        document.getElementById("mail").innerHTML = customer.mail;
        return;
      });
    });
}
settingAccountProperty(); //re-call back function

var menu = false;
//Gestione dropdown
document.getElementById("dropdown").addEventListener("click", () => {
  menu = menu ? false : true;
  document.getElementById("drop-visible").classList.toggle("open");
  if (menu) {
    document.getElementById("drop-visible").style.display = "flex";
    return;
  }
  setTimeout(() => {
    document.getElementById("drop-visible").style.display = "none";
  }, 600);
});

//Controllo accesso eseguito
function controllaAccesso() {
  let accesso = localStorage.getItem("accesso");
  if (accesso === null) return false;
  return true;
}

//caricamento banner
window.addEventListener("DOMContentLoaded", () => {
  fetch("json/carousel.json")
    .then((response) => {
      if (!response.ok) {
        console.error("Errore nella lettura del file JSON");
        return;
      }
      return response.json();
    })
    .then((data) => {
      let index = 0;
      const sfondo = document.getElementById("sfondo");

      setTimeout(() => {
        function showItem() {
          const sfondo = document.getElementById("sfondo");

          // Avvia dissolvenza in uscita
          sfondo.classList.remove("fade-in");
          sfondo.classList.add("fade-out");

          // Dopo la transizione (500ms), cambia contenuto
          setTimeout(() => {
            sfondo.innerHTML = ""; // Svuoto

            const element = data[index];

            let img = document.createElement("img");
            img.src = element.img;

            let container = document.createElement("div");
            container.id = "container-descrizione";

            let description = document.createElement("div");
            description.innerHTML = element.tag;
            description.id = "description";

            let title = document.createElement("div");
            title.innerHTML = element.text;
            title.id = "titolo-promo";

            let integration = document.createElement("div");
            integration.innerHTML = element.description;
            integration.id = "integration";

            container.appendChild(description);
            container.appendChild(title);
            container.appendChild(integration);

            sfondo.appendChild(img);
            sfondo.appendChild(container);

            // Avvia dissolvenza in entrata
            sfondo.classList.remove("fade-out");
            sfondo.classList.add("fade-in");

            // Passa al prossimo
            index = (index + 1) % data.length;
          }, 500); // Attendi fine transizione fade-out
        }

        // Mostra subito il primo elemento
        showItem();

        // Poi lo cambia ogni 3 secondi
        setInterval(showItem, 5000);
      }, 1000);
    });
});

//caricamento categorie
window.addEventListener("DOMContentLoaded", () => {
  fetch("json/utility.json")
    .then((response) => {
      if (!response.ok) {
        console.error("Errore nella lettura del file JSON");
        return;
      }
      return response.json();
    })
    .then((data) => {
      data.categorie.forEach((element) => {
        let sfondo = document.getElementById("categorie");

        let box = document.createElement("div");
        box.classList.add("categoria");
        box.id = element.nome.toLowerCase();

        let icon = document.createElement("span");
        icon.classList.add("icons");
        icon.innerHTML = element.icon;
        let text = document.createElement("span");
        text.classList.add("text-icons");
        text.innerHTML = element.nome;

        box.appendChild(icon);
        box.appendChild(text);

        sfondo.appendChild(box);

        //Creazione categorie in dropdown
        let dropV = document.getElementById("drop-visible");
        let level = document.createElement("div");
        level.classList.add("dropdown-menu");
        level.innerHTML = element.icon + element.nome;

        dropV.appendChild(level);
      });
    });
});

//countdown -> js
var countDate = new Date("Jul 18, 2025, 15:30:27").getTime();
setInterval(() => {
  //Data attuale
  let now = new Date().getTime();

  //distanza
  let distance = countDate - now;

  //CALCOLI
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //creazioni box
  let sale = document.getElementById("current-data");
  sale.innerHTML = "";

  let dayBox = document.createElement("span");
  dayBox.classList.add("setting-giorni");
  dayBox.innerHTML = days;

  let hourBox = document.createElement("span");
  hourBox.classList.add("setting-giorni");
  hourBox.innerHTML = hours;

  let minuteBox = document.createElement("span");
  minuteBox.classList.add("setting-giorni");
  minuteBox.innerHTML = minutes;

  let secondsBox = document.createElement("span");
  secondsBox.classList.add("setting-giorni");
  secondsBox.innerHTML = seconds;

  sale.appendChild(dayBox);
  sale.appendChild(hourBox);
  sale.appendChild(minuteBox);
  sale.appendChild(secondsBox);
}, 1000); //incrementing every 1s

//gestione prodotti
window.addEventListener("DOMContentLoaded", () => {
  fetch("json/products.json")
    .then((response) => {
      if (!response.ok) {
        console.error("ERRORE NEL CARICAMENTO DEL FILE JSON");
        return;
      }
      return response.json();
    })
    .then((dataJson) => {
      dataJson.forEach((element) => {
        //CARICAMENTO PRODOTTI -> IN OFFERTA
        //VARIABILI RIFERIMENTO
        let insertBox = document.getElementById("prodotti-scontati"); //DIV SALE
        let productBoxNormal = document.getElementById("prodotti-classici");

        let scheda = document.createElement("div");
        scheda.classList.add("scheda-prodotto"); //SCHEDA PRODOTTO

        let container = document.createElement("div");
        container.classList.add("container");

        let productImg = document.createElement("img");
        productImg.classList.add("prodotto-img");
        productImg.src = element.immagine;

        let title = document.createElement("h1");
        title.classList.add("prodotto-titolo");
        title.innerHTML = element.nome;

        let marca = document.createElement("p");
        marca.classList.add("prodotto-marca");
        marca.innerHTML = element.marca;

        let valutazione = document.createElement("div");
        valutazione.classList.add("valutazione");
        valutazione.innerHTML =
          '<i class="ri-star-fill"></i>' + "&nbsp;" + element.valutazione;

        let costo = document.createElement("span");
        costo.classList.add("prodotto-costo");
        costo.innerHTML = element.costo + "&euro;";
        //inserimento
        scheda.appendChild(productImg);
        container.appendChild(title);
        container.appendChild(marca);
        container.appendChild(valutazione);
        container.appendChild(costo);
        scheda.appendChild(container);

        //inserimento in scheda
        if (element.bonus) {
          insertBox.appendChild(scheda);
        } else {
          productBoxNormal.appendChild(scheda);
        }
      });
    });
});

//menu login
var menuLogin = false;
document.getElementById("account-container").addEventListener("click", () => {
  let menu = document.getElementById("login-menu");

  if (!menuLogin) {
    menuLogin = true;
    menu.style.display = "block";
    return;
  }
  menuLogin = false;
  menu.style.display = "none";
});

//BUTTON EVENT -> LOGIN
document.getElementById("ll-inside").addEventListener("click", () => {
  window.location.href = "page/login.html";
});
