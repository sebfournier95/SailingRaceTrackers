const { Console } = require('console');
const fs = require('fs');

const inputJson = fs.readFileSync('boats.json', 'utf8');
const inputTracks = fs.readFileSync('tracks.json', 'utf8');
const jsonData = JSON.parse(inputJson);
const jsonTracks = JSON.parse(inputTracks);

const result = {
    "result": {}
};

function findLocById(tracks, id) {
    for (const track of tracks) {
        if (track.id === id) {
            return track.loc;
        }
    }
    return null; // Return null if id is not found
}

const boats = jsonData.reports.history;
const boatsData = boats[0].lines

for (let i = 0; i < boatsData.length; i++) {
    const racestatus = boatsData[i][1];
    if (racestatus != "RAC") {
        continue
    }
    const sail = parseInt(boatsData[i][0]);
    
    // === DEBUG boatsData STRUCTURE ===
    console.log('\n=== ANALYSE boatsData pour bateau', sail, '===');
    console.log('Longueur du tableau boatsData[i]:', boatsData[i].length);
    console.log('Type de boatsData[i]:', Array.isArray(boatsData[i]) ? 'Array' : typeof boatsData[i]);
    
    // Afficher les indices autour de 29
    console.log('\nÉléments autour de l\'index 29:');
    for (let idx = 25; idx <= Math.min(40, boatsData[i].length - 1); idx++) {
        const element = boatsData[i][idx];
        const elementType = Array.isArray(element) ? `Array[${element.length}]` : typeof element;
        console.log(`  [${idx}]:`, elementType, '-', Array.isArray(element) ? JSON.stringify(element).substring(0, 100) : element);
    }
    
    // Afficher le dernier élément (qui contient souvent la track)
    const lastIndex = boatsData[i].length - 1;
    console.log('\nDernier élément [' + lastIndex + ']:', JSON.stringify(boatsData[i][lastIndex]));
    
    const locForId = findLocById(jsonTracks.tracks, sail);
    let lastLocDatetime = locForId[0][0];
    const trackDataArray = boatsData[i][31];
    const track = [];
    const firstPoint = [
        (locForId[0][1] / 100000),
        (locForId[0][2] / 100000)
    ];
    track.push(firstPoint);

    for (let j = 0; j < locForId.length - 1; j++) {
        lastLocDatetime += locForId[j + 1][0];
        const transformedPoint = [
            (locForId[j + 1][1] / 100000) + track[j][0],
            (locForId[j + 1][2] / 100000) + track[j][1]
        ];
        track.push(transformedPoint);
    }

    console.log('=== DEBUG trackDataArray ===');
    console.log('Type:', typeof trackDataArray);
    console.log('Est un tableau?', Array.isArray(trackDataArray));
    console.log('Longueur:', trackDataArray?.length);
    console.log('Contenu complet:', trackDataArray);
    console.log('Premier élément [0]:', trackDataArray?.[0]);
    console.log('Type du premier élément:', typeof trackDataArray?.[0]);

    // Vérifier si c'est un tableau imbriqué
    if (Array.isArray(trackDataArray) && trackDataArray.length > 0) {
        console.log('trackDataArray[0][0]:', trackDataArray[0][0]);
        console.log('trackDataArray[0][1]:', trackDataArray[0][1]);
        console.log('trackDataArray[0][2]:', trackDataArray[0][2]);
    }
    
    const lastPoint = [
        trackDataArray[0][1],
        trackDataArray[0][2]
    ];
    track.push(lastPoint);

    result.result[sail] = {
        "heading": boatsData[i][7],
        "rank": boatsData[i][2],
        "sail": sail,
        "timestamp": lastLocDatetime,
        "lat_dec": 46.27500,
        "lon_dec": 1.47500,
        "speed": boatsData[i][8],
        "1hour_heading": 0,
        "1hour_speed": 0,
        "1hour_vmg": 0,
        "1hour_distance": 0,
        "lastreport_heading": 0,
        "lastreport_speed": 0,
        "lastreport_vmg": 0,
        "lastreport_distance": 0,
        "24hour_heading": boatsData[i][15],
        "24hour_speed": 0,
        "24hour_vmg": boatsData[i][18],
        "24hour_distance": boatsData[i][16],
        "dtf": boatsData[i][4],
        "dtl": boatsData[i][5],
        "dtp": boatsData[i][6],
        "darksky_twd": "-",
        "darksky_tws": "-",
        "darksky_air": "-",
        "finished": "true",
        "total_time": "74d 03h 35min 46s",
        "track": track
    };
}

const resultJson = JSON.stringify(result, null, 4);
fs.writeFileSync('boats_result.json', resultJson, 'utf8');
