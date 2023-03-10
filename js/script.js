/*
#Consegna

Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

# MILESTONE 1
Prepariamo "qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.

# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti

# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe. Se si, la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.

# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina. Raccogliamo quindi il messaggio è scriviamo un messaggio appropriato.
(Ma come stabiliamo quale sia il punteggio massimo?)

# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.

#BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

#SUPER BONUS
Se avete finito tutti i bonus potete scrivere all'insegnante o ai tutor per ricevere delle sfide extra!
*/

//---------------------------------------------------------------------------------

// FUNZIONI
// funzione per creare le celle
const createCell = (content) => {
  const cell = document.createElement("div");
  cell.append(content);
  cell.classList.add("cell");
  return cell;
};
//funzione per array numeri random
const getUniqueRandomNumberArray = (min, max, quantity) => {
  const randomNumbers = [];
  while (randomNumbers.length < quantity) {
    const randomNum = Math.floor(Math.random() * max - min + 1) + min;
    if (!randomNumbers.includes(randomNum)) {
      randomNumbers.push(randomNum);
    }
  }
  return randomNumbers;
};

// raccolgo gli elementi dal DOM

const playButton = document.getElementById("play-button");
const grid = document.getElementById("grid");
const playTitle = document.getElementById("play-title");
const message = document.getElementById("message");

//impostazioni iniziali

const rows = 10;
const cols = 10;
const totalCells = rows * cols;

// applico event listener al bottone
playButton.addEventListener("click", function () {
  // reset della griglia alla pressione del bottone
  grid.innerHTML = "";
  // reset messaggio
  message.innerHTML = "";

  // aggiungo e rimuovo classi
  grid.classList.add("align-content-start", "flex-wrap");
  grid.classList.remove("justify-content-center", "align-items-center");
  playTitle.classList.add("d-none");

  // punteggio utente
  let score = 0;

  //creo array per le caselle bomba
  const cpuNumbers = getUniqueRandomNumberArray(1, 100, 16);
  // calcolo numero per vincere la partita
  const winner = totalCells - cpuNumbers.length;

  for (let i = 1; i <= totalCells; i++) {
    // creo una cella
    const cell = createCell(i);
    // applico event listener alla cella
    cell.addEventListener("click", function () {
      // validazione
      if (cpuNumbers.includes(i)) {
        cell.classList.add("bomb");
        alert(`HAI PRESO UNA BOMBA! HAI PERSO! il tuo punteggio è ${score}`);
        grid.innerHTML = "";
        message.innerHTML = `<h4 class="text-danger">Gioca di nuovo!</h4>`;
      } else {
        if (cell.classList.contains("clicked")) {
          return false;
        } else {
          cell.classList.add("clicked");
          score++;
          if (score === winner) {
            alert("COMPLIMENTI! HAI VINTO!");
            grid.innerHTML = "";
          }
        }
      }
    });

    // appendo la cella in pagina
    grid.appendChild(cell);
  }
});
