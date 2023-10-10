

/* tooltip automatically positioned below the elements.... attached with dom element
@param {HTMLElement} element  =>dom el added to behaviour  */

export const Tooltip= function (element){
    let tooltip=document.createElement('span')

    tooltip.classList.add('tooltip', 'text-body-small');

    element.addEventListener('mouseenter',function (){tooltip.textContent=this.dataset.tooltip;
        
        let {
            top,
            left,
            height,
            width
        }= this.getBoundingClientRect()


        tooltip.style.top=top+height+4+'px';
        tooltip.style.left=left+(width / 2)+'px'
        tooltip.style.transform='translate(-50%, 0)'
        document.body.appendChild(tooltip)
    })

    element.addEventListener('mouseleave',tooltip.remove.bind(tooltip))
}