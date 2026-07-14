if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("service_worker.js")
        .then(() => {
            console.log("SW Registered!");
        })
        .catch(() => {
            console.log("SW Registration Failed");
        });
} else {
    console.log("Not supported");
}
