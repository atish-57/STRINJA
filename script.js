const itiscard = document.querySelector(".itiscard"),
    firstImg = itiscard.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;



const showHideIcons = () => {
    // showing and hiding prev/next icon according to itiscard scroll left value
    let scrollWidth = itiscard.scrollWidth - itiscard.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = itiscard.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = itiscard.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the itiscard scroll left else add to it
        itiscard.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if (itiscard.scrollLeft - (itiscard.scrollWidth - itiscard.clientWidth) > -1 || itiscard.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from itiscard left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if (itiscard.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return itiscard.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    itiscard.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = itiscard.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/itiscard to left according to mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    itiscard.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    itiscard.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    itiscard.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
}

itiscard.addEventListener("mousedown", dragStart);
itiscard.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
itiscard.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
itiscard.addEventListener("touchend", dragStop);