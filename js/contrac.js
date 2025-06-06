document.addEventListener("DOMContentLoaded", function () {
    const copyButton = document.querySelector(".contract__copy");
    const contractInput = document.querySelector(".contract__input");

    copyButton.addEventListener("click", function () {
        contractInput.select();
        document.execCommand("copy");

        copyButton.textContent = "Copied!";
        setTimeout(() => {
            copyButton.textContent = "Copy";
        }, 2000);
    });
});