console.log("appCMS.js is loading...");

const SANITY_CONFIG = {
    projectId: "426v8vnp",
    dataset: "production",
    apiVersion: "2026-06-01"
};

async function testConnection() {
    console.log("attempting fetch")
    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=*[_type == "system.version"][0]`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Connection Test Successful:", data);
    } catch (error) {
        console.error("Connection Test Failed:", error);
    }
}

testConnection();