import { Directive, effect, inject, input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[dlTooltip]',
    host: {
        '(mouseover)': 'onHover($event)',
        '(mouseleave)': 'onLeave($event)',
    }
})
export class DlTooltipDirective {
    private readonly renderer = inject(Renderer2);
    public tooltipElement: HTMLElement | null = null;
    public readonly openOnTrigger = input<boolean>(false)
    public readonly message = input.required<string>();
    public readonly extraClass = input<'error'>();
    public readonly openOnHover = input.required<boolean>();

    constructor() {
        effect(() => {
            if (this.openOnTrigger()) {
                this.doOpenTooltip()
            } else {
                this.doCloseOverlay();
            }
        })
    }

    private doOpenTooltip(event?: PointerEvent) {

        if (this.tooltipElement) return

        this.tooltipElement = this.renderer.createElement('span');
        this.renderer.addClass(this.tooltipElement, 'dl-tooltip')

        if (this.extraClass()) {
            this.renderer.addClass(this.tooltipElement, `dl-tooltip--${this.extraClass()}`)
        }

        const text = this.renderer.createText(this.message());
        this.renderer.appendChild(this.tooltipElement, text)

        const hasRect = (value: any): value is HTMLElement => typeof value.getBoundingClientRect === 'function';

        if (event && hasRect(event.target)) {
            this.renderer.insertBefore(event ? event.target.parentNode : this.tooltipElement?.parentNode, this.tooltipElement, event.target);
        }
    }

    private doCloseOverlay(event?: any) {
        this.renderer.removeChild(event ? event.target.parentNode : this.tooltipElement?.parentNode, this.tooltipElement);
        this.tooltipElement = null
    }

    private onHover(event: PointerEvent) {
        if (this.openOnHover()) this.doOpenTooltip(event);
    }

    private onLeave(event: PointerEvent) {
        if (this.openOnHover()) this.doCloseOverlay(event);
    }

}