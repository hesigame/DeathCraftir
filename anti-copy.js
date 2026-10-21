(() => {
    document.addEventListener("contextmenu", e => e.preventDefault());

    document.addEventListener("selectstart", e => e.preventDefault());

    document.addEventListener("copy", e => e.preventDefault());

    document.addEventListener("keydown", e => {
        const key = e.key.toLowerCase();

        if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
            (e.ctrlKey && key === "u") ||
            (e.ctrlKey && key === "s")
        ) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
})();
