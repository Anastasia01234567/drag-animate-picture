document.addEventListener('DOMContentLoaded', function(){
    let actionDragImg = document.querySelectorAll('[data-drag="img"]');
    if(actionDragImg[0]){
        for(let item of actionDragImg){
            initDrag(item);
            item.addEventListener('mousemove', e => {
               moveAt(e);
            });
            item.addEventListener('click', (e) =>{
                animateMouseDragPicutureRemove();
            })
        }
    }
});
let dragElem = null;
let dragFalse = (event) =>{
    return false
}
let animateMouseDragPicuture = (event) =>{
    dragElem = event.target;
    console.log('mousedown', dragElem)
}
let animateMouseDragPicutureRemove = () =>{
    console.log('mouseup');
    dragElem = null;
}
let moveAt = (e) =>{
    if(dragElem == null) return false;
    let parent = dragElem.closest('[data-max-width]'),
        afterContainer = parent.querySelector('[data-change="after-container"]'),
        afterImg = parent.querySelector('[data-change="after-img"]'),
        translateX = (parent.clientWidth / 2) + (parent.clientWidth - e.pageX),
        right = (parent.clientWidth / 2),
        left = parent.clientWidth + right;
    if(translateX < left || translateX > right ){
    afterContainer.style.transform = `translateX(${-translateX}px)`;
    afterImg.style.transform = `translateX(${translateX}px)`;
    dragElem.style.right = `${(parent.clientWidth - e.pageX) - (dragElem.clientWidth / 2)}px`
    }
}

let initDrag = (parentNode)=>{
    let afterContainer = parentNode.querySelector('[data-change="after-container"]'),
        afterImg = parentNode.querySelector('[data-change="after-img"]'),
        control = parentNode.querySelector('[data-slide-on="click"]');
    try{
        initEventsControl(control);
        calculateValueDragContainers(parentNode, afterContainer, afterImg, control);

    }catch (e) {
        console.log(e.message);
    }

}

let calculateValueDragContainers = (parentNode, afterContainer, afterImg, control) =>{
    let maxWidth = parentNode.clientWidth;
    try{
        parentNode.dataset['maxWidth'] = maxWidth;
        afterContainer.style.transform = `translateX(${-maxWidth}px)`;
        afterContainer.style.left = `${-maxWidth/2}px`;
        afterContainer.style.right = `${-maxWidth/2}px`;
        afterImg.style.transform =`translateX(${maxWidth}px)`;
        afterImg.style.left = `${maxWidth/2}px`;
        afterImg.style.right = `${maxWidth/2}px`;
        control. style.right = `${(maxWidth/2) - (control.clientWidth / 2)}px`;
        console.log(maxWidth);
    }catch (e) {
        console.log(e.message);
    }

}
let initEventsControl = (control) =>{
    control.addEventListener('mousedown', animateMouseDragPicuture, {once: false});
    control.addEventListener('mouseup', animateMouseDragPicutureRemove, {once: false});
    control.addEventListener('dragstart ', dragFalse);
}
