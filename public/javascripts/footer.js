(function(){
    var pathName = window.location.pathname;
    console.log('pathName: ',pathName);
    var footerEls = document.getElementById('footer').getElementsByTagName('a');
    footerEls = Array.prototype.slice.call(footerEls);
    console.log('footerEls: ',footerEls);
    footerEls.forEach(function(anchor) {
        console.log('anchor: ',anchor);
        if(anchor.pathname == pathName){
            anchor.classList.add('selected');
        }
    });
})()