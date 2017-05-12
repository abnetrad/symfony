(function(){
    let openBtn =           document.getElementById('open-button'),
        closeBtn =          document.getElementById('close-button'),
        domEl =             document.querySelector('html'),
        linkEl =            document.body.querySelectorAll('.kr-link'),
        isOpen =            false,
        subLevelIsOpen =    false,
        eventClick =         mobilecheck() ? 'touchstart' : 'click';

    // Open subLevel
    [].slice.call(document.querySelectorAll(".kr-link")).forEach(function(el,i){

        el.addEventListener(eventClick, function(){
            if(subLevelIsOpen){
                document.querySelector('.kr-link.active').classList.remove('active');
            }else if(!subLevelIsOpen){
                domEl.classList.add('show-menu-sublevel');    
            }

            this.classList.add('active');

            subLevelIsOpen = true;
        })
    });

    const init = () => {
        document.addEventListener(eventClick, function( el ) {
            var target = el.target;

            if(target === openBtn){
                openMenu();
            }else if(target === closeBtn && !subLevelIsOpen || !hasParent( el, "kr-menu" )){
                closeMenu();
            }else if(target === closeBtn && subLevelIsOpen){
                closeSubLevel();
            }
        })
    }

    const openMenu = () => {
        domEl.classList.add('show-menu');
        isOpen = !isOpen;
    }

    const closeMenu = () => {
        domEl.classList.remove('show-menu');
        if(subLevelIsOpen){
            let subLevelOpen = document.querySelector('.kr-link.active');
            subLevelOpen.classList.remove('active');
            domEl.classList.remove('show-menu-sublevel');
            subLevelIsOpen = false;
        }
        isOpen = !isOpen;
        return false;
    }

    const closeSubLevel = () => {
        let linkActive = document.querySelector(".kr-link.active");
        linkActive.classList.remove('active');
        domEl.classList.remove('show-menu-sublevel');
        subLevelIsOpen = false;
    }

    init();
})();
    
