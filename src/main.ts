// 🏆 Snack 1

// Hai ricevuto un dato generico da un'API, ma non sai di che tipo sia… Il tuo compito è controllare il tipo del dato e stampare il valore in modo corretto. http://localhost:3333/products

async function fetchProduct() {

  try {
    //chiamata endpoint a products
    const response = await fetch("http://localhost:3333/products")

    //se ok e false errore
    if (!response.ok) {
      throw new Error(`Errore Url non trovato ${response.status}`);
    }

    //converto in json
    const convertJson = await response.json()

    //ritorno la risposta
    return convertJson

  } catch (err) {

    console.error(err)

  }

}

//risolvo promise una volta ricevuta avuta la chiamata
const risultato: unknown = await fetchProduct()
console.log(risultato);



if (typeof risultato === "string") {
  //  Se è una stringa: stampala in maiuscolo
  console.log(risultato.toUpperCase())

} else if (typeof risultato === "number") {

  //  Se è un numero: moltiplicalo per due e stampalo
  console.log(risultato * 2);

} else if (typeof risultato === "boolean") {

  //   Se è un booleano: stampa “Sì” o “No” in base al suo valore
  if (risultato) {
    console.log("Si");
  } else {
    console.log("No");
  }

} else if (risultato === null) {
  //Se è null: stampa “Il dato è vuoto”
  console.log("Il dato e vuoto");

} else if (Array.isArray(risultato)) {
  //Se è un array: stampa la sua lunghezza
  console.log(risultato.length);

} else if (

  typeof risultato === "object" &&    // 1️⃣ Controlla che sia un oggetto (le Promise sono oggetti)
  risultato !== null &&               // 2️⃣ Controlla che non sia null (typeof null === "object")
  risultato &&                        // 3️⃣ Controlla che non sia undefined o falsy
  'then' in risultato &&              // 4️⃣ Controlla che abbia la proprietà 'then' (SICURO - no any!)
  typeof risultato.then === "function" // 5️⃣ Controlla che 'then' sia una funzione

) {
  // 6️⃣ Se TUTTI i controlli passano, è sicuramente una Promise
  const valore = await(risultato as Promise<unknown>);  // 7️⃣ Aspetta che si risolva
  console.log("Promise risolta:", valore);              // 8️⃣ Stampa il valore risolto
} else {
  console.log("Tipo non supportato");
}




// 🏆 Snack 2
// Crea un type alias Dipendente che rappresenta un lavoratore con i seguenti dati:
//     nome → stringa
//     cognome → stringa
//     annoNascita → numero
//     sesso → Può essere solo "m" o "f".
//     anniDiServizio (array di numeri, es. [2014, 2015, 2017, 2018])

// 🎯 BONUS
// Il type alias Dipendente, ha anche i seguenti dati:
//     emailAziendale → Email assegnata al dipendente (non si può modificare)
//     contratto → Specifica il tipo di contratto del dipendente, con valori limitati a “indeterminato”, “determinato” o “freelance”.

type TipoContratto = "indeterminato" | "determinato" | "freelance";

type Dipendente = {
  nome: string,
  cognome: string,
  annoNascita: number,
  sesso: "m" | "f",
  anniDiServizio: number[],
  emailAziendale: readonly [string],
  contratto: TipoContratto
}


// 🏆 Snack 3
// Estendiamo Dipendente per definire due ruoli specifici all'interno dell'azienda:

//     Developer

//  livelloEsperienza → Il livello di esperienza del developer (le scelte possibili sono solo “Junior”, “Mid” o “Senior”).
// linguaggi → Un array contenente i linguaggi di programmazione utilizzati dal developer in azienda (opzionale, perché i neo assunti non hanno ancora dei linguaggi assegnati).
//  certificazioni → Un array di stringhe contenente certificazioni tecniche ottenute dal developer (può essere vuoto).
type Developer = Dipendente & {
  livelloEsperienza: "Junior" | "Mid" | "Senior", linguaggi?: string[],
  certificazioni: string[]
}

// ProjectManager

//     teamSize → Il numero di persone nel team gestito dal Project Manager (può essere null se non ha ancora un team assegnato).
//     budgetGestito → Il totale del budget annuale gestito dal PM (opzionale).
//     stakeholderPrincipali → Un array di stringhe con i nomi dei principali stakeholder con cui il PM collabora (può essere vuoto).
type ProjectManager = Developer & {
  teamSize: number | null,
  budgetGestito?: number,
  stakeholderPrincipali?: string[]
}




// 🎯 BONUS

// Definiamo un nuovo type alias Team, che rappresenta un gruppo di lavoro all'interno dell'azienda:

//     nome → Nome del team (stringa).
//     progettoAttuale → Nome del progetto su cui lavora il team (può essere null se il team è in attesa di assegnazione).
//     budget → Importo numerico del budget assegnato al team (sempre presente).
//     membri → Una tuple in cui il primo elemento è sempre un Project Manager, seguito da uno o più Developers (almeno un developer obbligatorio).
type Team = {
  nome: string,
  progettoAttuale: string | null,
  readonly budget:  number,
  membri: [ProjectManager, ...Developer[]]
}







































/////////////// TEST  //////////////////

// Crea istanze per testare
const developer1: Developer = {
  nome: "Mario",
  cognome: "Rossi", 
  annoNascita: 1990,
  sesso: "m",
  anniDiServizio: [2020, 2021, 2022],
  emailAziendale: ["mario.rossi@azienda.com"],
  contratto: "indeterminato",
  livelloEsperienza: "Mid",
  linguaggi: ["JavaScript", "TypeScript"],
  certificazioni: ["React Certified"]
}

const developer2: Developer = {
  nome: "Anna",
  cognome: "Verdi",
  annoNascita: 1995,
  sesso: "f", 
  anniDiServizio: [2021, 2022],
  emailAziendale: ["anna.verdi@azienda.com"],
  contratto: "determinato",
  livelloEsperienza: "Junior",
  certificazioni: []
}

const projectManager1: ProjectManager = {
  nome: "Luca",
  cognome: "Bianchi",
  annoNascita: 1985,
  sesso: "m",
  anniDiServizio: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
  emailAziendale: ["luca.bianchi@azienda.com"],
  contratto: "indeterminato",
  livelloEsperienza: "Senior",
  linguaggi: ["JavaScript", "Python", "Java"],
  certificazioni: ["PMP", "Scrum Master"],
  teamSize: 5,
  budgetGestito: 150000,
  stakeholderPrincipali: ["Cliente A", "Marketing"]
}

const team1: Team = {
  nome: "Team Frontend",
  progettoAttuale: "E-commerce Platform",
  budget: 200000,
  membri: [projectManager1, developer1, developer2]
}

// Log degli oggetti
console.log("🚀 Developer 1:", developer1);
console.log("🚀 Developer 2:", developer2);
console.log("🚀 Project Manager:", projectManager1);
console.log("🚀 Team completo:", team1);