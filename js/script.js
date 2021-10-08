(function() {
    const closeBtn = document.querySelector(".close");
    const menuBtn = document.querySelector(".menu-icon");
    const navLinksContainer = document.getElementById("navigation-links");
    const links = document.querySelectorAll("#navigation-links a");
    const backProjectBtn = document.getElementById("back-project-button");
    const modal = document.getElementById("modal-download");
    const closeLinksBtn = document.querySelector(".close-links");
    const gotItButton = document.getElementById("got-it");
    const modalBoxParagraphs = document.querySelectorAll(".box h4");
    const continueButtons = document.querySelectorAll(".continue-button");
    const modalBox = document.getElementById("modal");
    const thankYouBox = document.getElementById("thank-you");
    const totalBackedAmountContainer = document.getElementById("total-backed");
    const totalBackersContainer = document.getElementById("total-backers");
    const progressBar = document.querySelector(".bar");
    const progressBarContainer = document.getElementById("progress-bar");

    window.addEventListener("DOMContentLoaded", animateProgressBar);
    window.addEventListener("resize", hideNavLinks);
    closeBtn.addEventListener("click", closeModal);
    menuBtn.addEventListener("click", showNavLinks);
    backProjectBtn.addEventListener("click", showProjectModal);
    closeLinksBtn.addEventListener("click", hideNavLinks);
    gotItButton.addEventListener("click", closeModal);
    document.body.addEventListener("click", HideNavOnWindowEvent, true);
    window.addEventListener("scroll", HideNavOnWindowEvent, true);

    modalBoxParagraphs.forEach(paragraph => {
        paragraph.addEventListener("click", showPriceInput);
    });

    links.forEach(link => {
        link.addEventListener("click", hideNavLinks);
    });

    continueButtons.forEach(button => {
        button.addEventListener("click", showThankYouBox);
    });

    function closeModal() {
        modal.classList.add("hidden");
        document.body.classList.remove("hidden-overflow");
        modalBox.classList.remove("hidden");
        thankYouBox.classList.add("hidden");

        animateProgressBar();
    }

    function showNavLinks() {
        navLinksContainer.classList.remove("hidden");
        menuBtn.classList.add("hidden");
        closeLinksBtn.classList.remove("hidden");
    }
    function hideNavLinks() {
        navLinksContainer.classList.add("hidden");
        menuBtn.classList.remove("hidden");
        closeLinksBtn.classList.add("hidden");
    }
    function showProjectModal() {
        modal.classList.remove("hidden");
        document.body.classList.add("hidden-overflow");
        progressBarContainer.classList.remove("animate");
    }
    function isVisible(el) {
        return !el.classList.contains("hidden");
    }
    function HideNavOnWindowEvent(e) {
        if (isVisible(navLinksContainer)) {
            e.stopPropagation();
            hideNavLinks();
        }
    }
    function showPriceInput() {
        const boxContainer = this.closest(".box");
        if (boxContainer.classList.contains("active")) {
            boxContainer.classList.remove("active");
        } else boxContainer.classList.add("active");
    }
    function showThankYouBox() {
        modalBox.classList.add("hidden");
        thankYouBox.classList.remove("hidden");
        const input = this.previousElementSibling.lastElementChild;
        let totalBackedAmount = totalBackedAmountContainer.textContent.slice(1).replace(/,/, '');
        totalBackedAmount = Number(totalBackedAmount) + Number(input.value);
        totalBackedAmountContainer.textContent = "$" + totalBackedAmount.toLocaleString();
        // console.log(totalBackedAmount.toLocaleString());

        let totalBackers = totalBackersContainer.textContent.replace(",", '');
        totalBackers = Number(totalBackers) + 1;
        totalBackersContainer.textContent = totalBackers.toLocaleString();
        const boxContainers = document.querySelectorAll(".box");
        boxContainers.forEach(box => {
            box.classList.remove("active");
        });
    }


    function animateProgressBar() {
        let totalAmount = totalBackedAmountContainer.textContent;
        totalAmount = totalAmount.slice(1).replace(',', '');
        totalAmount = Number(totalAmount);
        let progressBarRemainingPercentage = (totalAmount / 100000) * 100;
        progressBarRemainingPercentage = Math.max(0, 100 - progressBarRemainingPercentage);
        progressBarContainer.classList.add("animate");
        progressBar.style.transform = `translateX(${-progressBarRemainingPercentage}%)`;
    }
}());