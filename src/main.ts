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
  const valore = await (risultato as Promise<unknown>);  // 7️⃣ Aspetta che si risolva
  console.log("Promise risolta:", valore);              // 8️⃣ Stampa il valore risolto
} else {
  console.log("Tipo non supportato");
}




