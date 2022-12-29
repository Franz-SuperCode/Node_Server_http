import http from 'http'
import fs from 'fs'

// Erstelle einen HTTP-Server. Diese Methode bekommt eine Anonyme Funktion übergeben in der zwei Objekte als Paraeter übergeben werden
const server = http.createServer((req, res) => {
    // Gebe Request-Informationen in der Konsole aus.
    console.log('Ein Request:', req.method, req.url);

    // Bestimme den Pfad der angeforderten Datei. req.url ist eine Eigenschaft von dem Objekt
    const filePath = './assets' + req.url;


    // Lese die Datei
    fs.readFile(filePath, (err, data) => {
        // Wenn es beim Lesen der Datei einen Fehler gibt, sende eine Fehlermeldung an den Client
        if (err) {
            sendError(res)
            return
        }
        // Sonst sende die Datei als String an den Client
        sendFile(res, data)
    })
})

// Starte den Server auf dem Port 9898
server.listen(9898, () => console.log('Server läuft auf Port 9898'))

// Diese Funktion sendet eine Fehlermeldung an den Client
function sendError(res) {
    res.end('error')
}

// Diese Funktion sendet eine Datei als String an den Client
function sendFile(res, data) {
    res.end(data.toString())
}