window.onload = function(){
    document.querySelectorAll('.items li').forEach(function(element) {
        element.addEventListener('click', (t) => {
            document.querySelectorAll('.items li').forEach(li=>li.setAttribute('class',''));
            t.target.setAttribute('class','selected');
            document.querySelector('.items span').innerHTML = t.target.innerText;
        });
    }, this);
};

let arrowFunc = ()=>{};