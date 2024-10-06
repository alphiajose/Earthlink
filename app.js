async function getSatelliteData() {
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;
    const output = document.getElementById('output');

    try {
        const response = await fetch(/satellite-data?lat=${lat}&lon=${lon}&date=2024-10-06);
        const data = await response.json();
        output.innerHTML = <pre>${JSON.stringify(data, null, 2)}</pre>;
    } catch (error) {
        output.innerHTML = <p>Error fetching satellite data</p>;
    }
}